import { sequelize } from "../configs/postgresDB.js";
import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       properties:
 *         file_id:
 *           type: integer
 *           description: The unique identifier for the file
 *         folder_id:
 *           type: integer
 *           description: The ID of the folder containing the file
 *         name:
 *           type: string
 *           description: The name of the file
 *         description:
 *           type: string
 *           description: The description of the file
 *         content:
 *           type: string
 *           description: The content of the file
 *         is_public:
 *           type: boolean
 *           description: Whether the file is public or not
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the file was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the file was last updated
 *       required:
 *         - folder_id
 *         - name
 *       example:
 *         file_id: 1
 *         folder_id: 1
 *         name: "File 1"
 *         description: "Description of File 1"
 *         content: "Content of File 1"
 *         is_public: false
 *         createdAt: "2023-01-01T10:00:00Z"
 *         updatedAt: "2023-01-01T10:00:00Z"
 */
const File = sequelize.define('File', {
    file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    folder_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'Files',
    timestamps: true
});

export default File;