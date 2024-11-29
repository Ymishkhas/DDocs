import express from 'express';
import FolderController from '../controllers/FolderController.js';

const router = express.Router();

router.post('/', FolderController.createFolder);
router.get('/root', FolderController.getRootFolder);
router.get('/:folder_id', FolderController.getFolderById);
router.put('/:folder_id', FolderController.updateFolder);
router.delete('/:folder_id', FolderController.deleteFolder);

export default router;