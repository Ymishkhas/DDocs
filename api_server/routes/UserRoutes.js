import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:user_id', UserController.getUserById);
router.put('/:user_id', UserController.updateUser);
router.delete('/:user_id', UserController.deleteUser);

export default router;