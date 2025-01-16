import { Router } from "express";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";
import { checkAuth } from "../utils";

export const appRouter = Router();

// Auth routes
appRouter.use("/auth", authRouter);

// Todo routes
appRouter.use("/todos", checkAuth, todoRouter);
