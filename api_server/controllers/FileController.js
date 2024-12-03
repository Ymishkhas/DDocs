import { File, Folder } from '../models/index.js';

const FileController = {

    /**
     * @swagger
     * /files:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Create a new file
     *     description: Create a new file within the specified folder.
     *     tags: [Files]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               folder_id:
     *                 type: integer
     *                 description: The ID of the folder where the file will be created
     *               name:
     *                 type: string
     *                 description: The name of the file
     *               content:
     *                 type: string
     *                 description: The content of the file
     *     responses:
     *       201:
     *         description: File created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/File'
     *       400:
     *         description: Bad request
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: Folder not found or you do not have access to this folder
     */
    async createFile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const user_id = req.user.user_id // 'dfsfsfy653hg'; // user_id: req.user.user_id,
            const { folder_id, name, content } = req.body;

            // Check if the folder exists and belongs to the user
            const folder = await Folder.findOne({
                where: {
                    folder_id: folder_id,
                    user_id: user_id
                }
            });
            if (!folder) {
                return res.status(404).json({ message: "Folder not found or you do not have access to this folder" });
            }

            const newFile = await File.create({ folder_id, name, content });
            res.status(201).json(newFile);
        } catch (error) {
            res.status(400).json({ message: "Error creating file", error: error.message });
        }
    },

    /**
     * @swagger
     * /files/{file_id}:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Get file by ID
     *     description: Retrieve a file by its unique ID, including its folder information.
     *     tags: [Files]
     *     parameters:
     *       - in: path
     *         name: file_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The file ID
     *     responses:
     *       200:
     *         description: A file object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/File'
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: File not found or you do not have access to this file
     *       500:
     *         description: Error fetching file
     */
    async getFileById(req, res) {
        try {

            // Get the file 
            const file = await File.findOne({
                where: { file_id: req.params.file_id },
                include: [
                    {
                        model: Folder,
                        attributes: ['user_id'] // We don't need any attributes from the Folder model
                    }
                ]
            });

            if (!file) {
                return res.status(404).json({ message: "File not found" });
            }

            if(file.is_public) {
                return res.status(200).json(file);
            }

            // if the file is private lets check if the user is the owner and he is loged in
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            if (file.Folder.user_id !== req.user.user_id) {
                return res.status(403).json({ message: "You do not have access to this file" });
            }
            
            res.status(200).json(file);
        } catch (error) {
            res.status(500).json({ message: "Error fetching file", error: error.message });
        }
    },

    /**
     * @swagger
     * /files/{file_id}:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     summary: Update file by ID
     *     description: Update a file by its unique ID.
     *     tags: [Files]
     *     parameters:
     *       - in: path
     *         name: file_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The file ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the file
     *               content:
     *                 type: string
     *                 description: The content of the file
     *               is_public:
     *                 type: boolean
     *                 description: Indicates if the file is public
     *     responses:
     *       200:
     *         description: File updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/File'
     *       400:
     *         description: Bad request
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: File not found
     *       500:
     *         description: Error updating file
     */
    async updateFile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const [updated] = await File.update(req.body, {
                where: { file_id: req.params.file_id },
                include: [
                    {
                        model: Folder,
                        where: { user_id: req.user.user_id /*dfsfsfy653hg*/ },
                        attributes: [] // We don't need any attributes from the Folder model
                    }
                ]
            })

            if (updated) {
                const file = await File.findOne({
                    where: { file_id: req.params.file_id }
                });
                res.status(200).json(file);
            } else {
                res.status(404).json({ message: "File not found" });
            }
        } catch (error) {
            res.status(400).json({ message: "Error updating file", error: error.message });
        }
    },

    /**
     * @swagger
     * /files/{file_id}:
     *   delete:
     *     security:
     *       - bearerAuth: []
     *     summary: Delete file by ID
     *     description: Delete a file by its unique ID.
     *     tags: [Files]
     *     parameters:
     *       - in: path
     *         name: file_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The file ID
     *     responses:
     *       204:
     *         description: File deleted successfully
     *       401:
     *         description: User not authenticated
     *       404:
     *         description: File not found
     *       500:
     *         description: Error deleting file
     */
    async deleteFile(req, res) {
        try {
            // Check if the authenticated user is the same to whom he wants to update
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            const deleted = await File.destroy({
                where: { file_id: req.params.file_id },
                include: [
                    {
                        model: Folder,
                        where: { user_id: req.user.user_id  /*dfsfsfy653hg*/ },
                        attributes: [] // We don't need any attributes from the Folder model
                    }
                ]
            });
            if (deleted) {
                res.status(204).send("File deleted");
            } else {
                res.status(404).json({ message: "File not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting file", error: error.message });
        }
    }
};

export default FileController;