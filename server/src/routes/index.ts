import { Router } from "express";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter";

export const appRouter = Router();

// Auth routes
appRouter.use("/auth", authRouter);

// Todo routes
appRouter.use("/todos", todoRouter);
