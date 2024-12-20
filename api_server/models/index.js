import User from './User.js';
import Folder from './Folder.js'
import File from './File.js'

// Associations

User.hasMany(Folder, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Folder.belongsTo(User, {
    foreignKey: 'user_id'
});

Folder.hasMany(File, {
    foreignKey: 'folder_id',
    onDelete: 'CASCADE'
});
File.belongsTo(Folder, {
    foreignKey: 'folder_id'
});

// Define the alias for the subfolders relationship
Folder.hasMany(Folder, {
    foreignKey: 'parent_id',
    as: 'subfolders',
    onDelete: 'CASCADE'
});
Folder.belongsTo(Folder, {
    foreignKey: 'parent_id',
    as: 'parentFolder'
});

export {
    User,
    Folder,
    File
}