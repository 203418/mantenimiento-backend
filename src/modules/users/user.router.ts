import { Router } from "express";
import { firsRegisterCheck, registerCheck } from "../../helpers/checks/user.checks";
import AuthController from "../auth/auth.controller";
import UserController from "./users.controller";
import UserRepository from "./users.repository";

const userController = new UserController(new UserRepository());
const authController = new AuthController(new UserRepository());

const userRouter = Router();

userRouter.post('/register/first', firsRegisterCheck, userController.register.bind(userController));
userRouter.post('/register', registerCheck, userController.register.bind(userController));
userRouter.post('/login', authController.login.bind(authController));

export default userRouter;