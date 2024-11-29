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
 *         fullname:
 *           type: string
 *           description: The full name of the user
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
 *         - fullname
 *       example:
 *         user_id: "dfsfsfy653hg"
 *         username: "mali"
 *         fullname: "Mohamed Ali"
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
    fullname: {
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