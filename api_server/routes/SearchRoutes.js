import express from 'express';
import SearchController from '../controllers/SearchController.js';

const router = express.Router();

router.get('/documents', SearchController.searchFiles);
router.get('/users', SearchController.searchUsers);

export default router;
