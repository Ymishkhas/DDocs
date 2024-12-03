import { User, Folder, File } from '../models/index.js';

const UserController = {
    /**
     * @swagger
     * /users:
     *   post:
     *     security:
     *      - bearerAuth: []
     *     summary: Create a new user
     *     description: Create a new user with the provided information.
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     */
    async createUser(req, res) {
        try {
            const { user_id, username, fullname, email } = req.body;
            const newUser = await User.create({ user_id, username, fullname, email });

            // Create default folder structure
            const rootFolder = await Folder.create({
                name: 'My Documents',
                user_id: newUser.user_id,
                parent_id: null
            });

            const subFolder = await Folder.create({
                name: 'Getting Started',
                user_id: newUser.user_id,
                parent_id: rootFolder.folder_id
            });

            await File.create({
                title: 'Creating folders and files',
                description: 'This is how to create folders and files in the app',
                is_public: false,
                folder_id: subFolder.folder_id,
                user_id: newUser.user_id
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: "Error creating user", error: error.message });
        }
    },

    /**
     * @swagger
     * /users:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Get all users
     *     description: Retrieve a list of all users.
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: A list of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *       500:
     *         description: Error fetching users
     */
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error: error.message });
        }
    },

    /**
     * @swagger
     * /users/{user_id}:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Get user by ID
     *     description: Retrieve a user by their unique ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       200:
     *         description: A user object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     */
    async getUserById(req, res) {
        try {
            const user = await User.findByPk(req.params.user_id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error: error.message });
        }
    },

    /**
     * @swagger
     * /users/{user_id}:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     summary: Update user by ID
     *     description: Update the information of an existing user by their ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     *       404:
     *         description: User not found
     */
    async updateUser(req, res) {
        try {
            // Check if the authenticated user is the same to whom he wants to update
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            if (req.user.user_id !== req.params.user_id) {
                return res.status(403).json({ message: "You are not authorized to update this user" });
            }
            const [updated] = await User.update(req.body, {
                where: { user_id: req.params.user_id }
            });
            if (updated) {
                const updatedUser = await User.findByPk(req.params.user_id);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(400).json({ message: "Error updating user", error: error.message });
        }
    },

    /**
     * @swagger
     * /users/{user_id}:
     *   delete:
     *     security:
     *       - bearerAuth: []
     *     summary: Delete user by ID
     *     description: Delete an existing user by their ID.
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: user_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     responses:
     *       204:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     */
    async deleteUser(req, res) {
        try {
            // Check if the authenticated user is the same to whom he wants to update
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }
            if (req.user.user_id !== req.params.user_id) {
                return res.status(403).json({ message: "You are not authorized to update this user" });
            }
            const deleted = await User.destroy({
                where: { user_id: req.params.user_id }
            });
            if (deleted) {
                res.status(204).send("User deleted");
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    }
};

export default UserController;