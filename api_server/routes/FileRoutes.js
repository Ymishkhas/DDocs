import express from 'express';
import FileController from '../controllers/FileController.js';

const router = express.Router();

router.post('/', FileController.createFile);
router.get('/:file_id', FileController.getFileById);
router.put('/:file_id', FileController.updateFile);
router.delete('/:file_id', FileController.deleteFile);

export default router;