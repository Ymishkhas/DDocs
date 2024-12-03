import { Folder, File } from '../models/index.js';

async function fetchFolderHierarchy(folder_id, user_id) {

    let folder;

    if (folder_id === null) {
        // Fetch the root folder
        folder = await Folder.findOne({
            where: {
                user_id: user_id,
                parent_id: null
            },
            attributes: ['folder_id', 'name', 'parent_id'],
            include: [
                {
                    model: File,
                    attributes: ['file_id', 'name', 'description', 'is_public']
                }
            ]
        });
    } else {
        // Fetch a subfolder
        folder = await Folder.findOne({
            where: {
                folder_id: folder_id,
                user_id: user_id
            },
            attributes: ['folder_id', 'name', 'parent_id'],
            include: [
                {
                    model: File,
                    attributes: ['file_id', 'name', 'description', 'is_public']
                }
            ]
        });
    }

    if (!folder) {
        return null;
    }

    const subfolders = await Folder.findAll({
        where: {
            parent_id: folder.folder_id,
            user_id: user_id
        },
        attributes: ['folder_id', 'name', 'parent_id']
    });

    const subfolderPromises = subfolders.map(async (subfolder) => {
        const subfolderHierarchy = await fetchFolderHierarchy(subfolder.folder_id, user_id);
        return {
            ...subfolderHierarchy,
            isFolder: true
        };
    });

    const subfolderResults = await Promise.all(subfolderPromises);

    return {
        folder_id: folder.folder_id,
        name: folder.name,
        parent_id: folder.parent_id,
        subfolders: subfolderResults,
        files: folder.Files.map(file => ({
            ...file.toJSON(),
            isFolder: false
        })),
        isFolder: true
    };
}

const FolderController = {

    /**
     * @swagger
     * /folders:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Create a new folder
     *     description: Create a new folder within the specified parent folder.
     *     tags: [Folders]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               parent_id:
     *                 type: integer
     *                 description: The ID of the parent folder
     *               name:
     *                 type: string
     *                 description: The name of the new folder
     *     responses:
     *       201:
     *         description: Folder created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Folder'
     *       400:
     *         description: Bad request
     *       401:
     *         description: User not authenticated
     */
    async createFolder(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const user_id = req.user.user_id // 'dfsfsfy653hg'; // user_id: req.user.user_id,

            // The user authenticated, and its his parent folder so create the new folder
            const { parent_id, name } = req.body;
            const newFolder = await Folder.create({ parent_id, user_id, name });
            res.status(201).json(newFolder);
        } catch (error) {
            res.status(400).json({ message: "Error creating folder", error: error.message });
        }
    },

    /**
     * @swagger
     * /folders/root:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Get root folder
     *     description: Retrieve the root folder for the authenticated user, including its subfolders and files.
     *     tags: [Folders]
     *     responses:
     *       200:
     *         description: A root folder object
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 folder_id:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                       description: The name of the folder
     *                     subfolders:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           folder_id:
     *                             type: integer
     *                             description: The ID of the subfolder
     *                           parent_id:
     *                             type: integer
     *                             description: The ID of the parent folder
     *                           name:
     *                             type: string
     *                             description: The name of the subfolder
     *                     files:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           file_id:
     *                             type: integer
     *                             description: The ID of the file
     *                           name:
     *                             type: string
     *                             description: The name of the file
     *                           description:
     *                             type: string
     *                             description: The description of the file
     *                           is_public:
     *                             type: boolean
     *                             description: Indicates if the file is public
     *                     isLoaded:
     *                       type: boolean
     *                       description: Indicates if the folder data is fully loaded
     *       401:
     *         description: User not authenticated
     *       500:
     *         description: Error fetching root folder
     */
    async getRootFolder(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            // req.user.user_id)
            // const rootFolder = await Folder.findOne({
            //     where: {
            //         user_id: 'dfsfsfy653hg', // user_id: req.user.user_id,
            //         parent_id: null
            //     },
            // })

            const rootFolder = await fetchFolderHierarchy(null, req.user.user_id);

            if (!rootFolder) {
                return res.status(404).json({ message: "Root folder not found" });
            }

            res.status(200).json(rootFolder);
        } catch (error) {
            res.status(500).json({ message: "Error fetching root folder", error: error.message });
        }
    },

    /**
     * @swagger
     * /folders/{folder_id}:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Get folder by ID
     *     description: Retrieve a folder by its unique ID, including its subfolders and files.
     *     tags: [Folders]
     *     parameters:
     *       - in: path
     *         name: folder_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The folder ID
     *     responses:
     *       200:
     *         description: A folder object
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 folder_id:
     *                   type: object
     *                   properties:
     *                     name:
     *                       type: string
     *                       description: The name of the folder
     *                     subfolders:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           folder_id:
     *                             type: integer
     *                             description: The ID of the subfolder
     *                           parent_id:
     *                             type: integer
     *                             description: The ID of the parent folder
     *                           name:
     *                             type: string
     *                             description: The name of the subfolder
     *                     files:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           file_id:
     *                             type: integer
     *                             description: The ID of the file
     *                           name:
     *                             type: string
     *                             description: The name of the file
     *                           description:
     *                             type: string
     *                             description: The description of the file
     *                           is_public:
     *                             type: boolean
     *                             description: Indicates if the file is public
     *                     isLoaded:
     *                       type: boolean
     *                       description: Indicates if the folder data is fully loaded
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: Folder not found
     *       500:
     *         description: Error fetching folder
     */
    async getFolderById(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const folder = await Folder.findOne({
                where: {
                    user_id: req.user.user_id , // 'dfsfsfy653hg', // user_id: req.user.user_id,
                    folder_id: req.params.folder_id
                },
                attributes: ['folder_id', 'name'],
                include: [
                    {
                        model: Folder,
                        as: 'subfolders',
                        attributes: ['folder_id', 'parent_id', 'name'],
                    },
                    {
                        model: File,
                        attributes: ['file_id', 'name', 'description', 'is_public']
                    }
                ]
            });

            if (!folder) {
                return res.status(404).json({ message: "Folder not found" });
            }

            // Return strcutured data
            const structure = {
                [folder.folder_id]: {
                    folder_id: folder.folder_id,
                    name: folder.name,
                    subfolders: folder.subfolders,
                    files: folder.Files,
                    isLoaded: true
                }
            }
            res.status(200).json(structure);
        } catch (error) {
            res.status(500).json({ message: "Error fetching folder", error: error.message });
        }
    },

    /**
    * @swagger
    * /folders/{folder_id}:
    *   put:
    *     security:
    *       - bearerAuth: []
    *     summary: Update folder by ID
    *     description: Update a folder by its unique ID.
    *     tags: [Folders]
    *     parameters:
    *       - in: path
    *         name: folder_id
    *         required: true
    *         schema:
    *           type: string
    *         description: The folder ID
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *                 description: The name of the folder
    *               parent_id:
    *                 type: integer
    *                 description: The ID of the parent folder
    *     responses:
    *       200:
    *         description: A folder object
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 folder_id:
    *                   type: object
    *                   properties:
    *                     name:
    *                       type: string
    *                       description: The name of the folder
    *                     subfolders:
    *                       type: array
    *                       items:
    *                         type: object
    *                         properties:
    *                           folder_id:
    *                             type: integer
    *                             description: The ID of the subfolder
    *                           parent_id:
    *                             type: integer
    *                             description: The ID of the parent folder
    *                           name:
    *                             type: string
    *                             description: The name of the subfolder
    *                     files:
    *                       type: array
    *                       items:
    *                         type: object
    *                         properties:
    *                           file_id:
    *                             type: integer
    *                             description: The ID of the file
    *                           name:
    *                             type: string
    *                             description: The name of the file
    *                           description:
    *                             type: string
    *                             description: The description of the file
    *                           is_public:
    *                             type: boolean
    *                             description: Indicates if the file is public
    *                     isLoaded:
    *                       type: boolean
    *                       description: Indicates if the folder data is fully loaded
    *       401:
    *         description: User not authenticated
    *       404:
    *         description: Folder not found
    *       400:
    *         description: Error updating folder
    */
    async updateFolder(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const [updated] = await Folder.update(req.body, {
                where: { user_id: req.user.user_id, folder_id: req.params.folder_id }
            });
            if (updated) {
                const folder = await Folder.findOne({
                    where: { user_id: req.user.user_id, folder_id: req.params.folder_id }
                });
                res.status(200).json(folder);
            } else {
                res.status(404).json({ message: "Folder not found" });
            }
        } catch (error) {
            res.status(400).json({ message: "Error updating folder", error: error.message });
        }
    },

    /**
     * @swagger
     * /folders/{folder_id}:
     *   delete:
     *     security:
     *       - bearerAuth: []
     *     summary: Delete folder by ID
     *     description: Delete a folder by its unique ID.
     *     tags: [Folders]
     *     parameters:
     *       - in: path
     *         name: folder_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The folder ID
     *     responses:
     *       204:
     *         description: Folder deleted successfully
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: Folder not found
     *       500:
     *         description: Error deleting folder
     */
    async deleteFolder(req, res) {
        try {
            // Check if the authenticated user is the same to whom he wants to update
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const deleted = await Folder.destroy({
                where: { user_id: req.user.user_id /*dfsfsfy653hg*/, folder_id: req.params.folder_id }
            });
            if (deleted) {
                res.status(204).send("Folder deleted");
            } else {
                res.status(404).json({ message: "Folder not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting folder", error: error.message });
        }
    }
};

export default FolderController;