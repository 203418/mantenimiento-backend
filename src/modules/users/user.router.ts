import { Router } from "express";
import { firsRegisterCheck, getUsersDifferentsOfId, registerCheck, deleteUserOfId,updateUserOfId } from "../../helpers/checks/user.checks";
import AuthController from "../auth/auth.controller";
import UserController from "./users.controller";
import UserRepository from "./users.repository";

const userController = new UserController(new UserRepository());
const authController = new AuthController(new UserRepository());

const userRouter = Router();

userRouter.get('/count', userController.count.bind(userController));
userRouter.get('/getUsers/:id', getUsersDifferentsOfId, userController.getUsersDifferentOfId.bind(userController))
userRouter.post('/register/first', firsRegisterCheck, userController.register.bind(userController));
userRouter.post('/register', registerCheck, userController.register.bind(userController));
userRouter.post('/login', authController.login.bind(authController));
userRouter.post('/login/token', authController.getUserByToken.bind(authController));
userRouter.delete('/delete', userController.deleteUserOfId.bind(userController));
userRouter.put('/update', userController.updateUserOfId.bind(userController));

export default userRouter;