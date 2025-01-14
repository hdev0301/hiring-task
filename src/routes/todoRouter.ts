import { Router } from "express";
import { TodoValidator } from "../validators";
import { TodoController } from "../controllers";

export const todoRouter = Router();

todoRouter.get(
  "/",
  TodoValidator.getValidator(),
  TodoController.getController,
);

todoRouter.post(
  "/",
  TodoValidator.createValidator(),
  TodoController.createController,
);

todoRouter.put(
  "/:id",
  TodoValidator.updateValidator(),
  TodoController.updateController,
);

todoRouter.post(
  "/:id",
  TodoValidator.deleteValidator(),
  TodoController.deleteController,
);
