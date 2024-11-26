import { sequelize } from "../configs/postgresDB.js";
import { DataTypes } from "sequelize";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: The unique identifier for the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated
 *       required:
 *         - user_id
 *         - username
 *         - first_name
 *         - last_name
 *       example:
 *         user_id: "dfsfsfy653hg"
 *         username: "mali"
 *         first_name: "Mohamed"
 *         last_name: "Ali"
 *         email: "mali@example.com"
 *         createdAt: "2023-01-01T10:00:00Z"
 *         updatedAt: "2023-01-01T10:00:00Z"
 */
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Users',
    schema: 'public',
    timestamps: true
});

export default User;