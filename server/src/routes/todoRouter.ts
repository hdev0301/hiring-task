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
  "/:uuid",
  TodoValidator.updateValidator(),
  TodoController.updateController,
);

todoRouter.delete(
  "/:uuid",
  TodoValidator.deleteValidator(),
  TodoController.deleteController,
);
