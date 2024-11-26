import { sequelize } from "../configs/postgresDB.js";
import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     Folder:
 *       type: object
 *       properties:
 *         folder_id:
 *           type: integer
 *           description: The unique identifier for the folder
 *         parent_id:
 *           type: integer
 *           description: The ID of the parent folder
 *         user_id:
 *           type: string
 *           description: The ID of the user who owns the folder
 *         name:
 *           type: string
 *           description: The name of the folder
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the folder was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the folder was last updated
 *       required:
 *         - user_id
 *         - name
 *       example:
 *         folder_id: 1
 *         parent_id: null
 *         user_id: "dfsfsfy653hg"
 *         name: "Root Folder"
 *         createdAt: "2023-01-01T10:00:00Z"
 *         updatedAt: "2023-01-01T10:00:00Z"
 */
const Folder = sequelize.define('Folder', {
    folder_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parent_id: {
        type: DataTypes.INTEGER
    },
    user_id: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Folders',
    timestamps: true,
});

export default Folder;