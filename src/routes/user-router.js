import express from 'express';
import {getUsers, getUserById} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers);
userRouter.route('/:id').get(getUserById);

export default userRouter;