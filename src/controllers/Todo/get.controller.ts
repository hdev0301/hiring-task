import httpStatus from "http-status";
import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const getHandler = async (req, res) => {
  const todos = await todoService.getTodos();
  res.json({ items: todos || [] }).status(httpStatus.OK)
};

export const getController = errorHandlerWrapper(getHandler);
