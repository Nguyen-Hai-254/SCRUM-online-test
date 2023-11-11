import express from "express";
import { login, register, allUsers, changeName, changeRole, singleUser } from "../controller/userController.js";

const UserRouter = express.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/all', allUsers);
UserRouter.put('/role', changeRole);
UserRouter.put('/name', changeName);
UserRouter.get('/single/:id', singleUser);

export default UserRouter;