import httpStatus from "http-status";
import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const getHandler = async (req, res) => {
  const user = req.user;
  const todos = await todoService.getTodos(user);
  res.json({ items: todos || [] }).status(httpStatus.OK)
};

export const getController = errorHandlerWrapper(getHandler);
