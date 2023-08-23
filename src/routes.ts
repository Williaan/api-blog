import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";
import { LoginController } from "./controllers/LoginController";


export const router = Router();

const userController = new UserController();
const postController = new PostController();
const loginController = new LoginController();


router.post("/register", userController.createUser);
router.post("/login", loginController.login);


router.post("/post/user/:id", postController.createPost);
router.get("/posts", postController.getPosts);
router.put("/post/:id", postController.updatePost);
router.delete("/post/:id", postController.deletePost);
router.get("/post/:id", postController.getPost);