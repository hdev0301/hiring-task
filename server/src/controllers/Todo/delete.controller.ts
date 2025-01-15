import httpStatus from "http-status";
import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const deleteHandler = async (req, res) => {
  const { uuid } = req.params;
  const todo = await todoService.getTodoById({ uuid });
  if (!todo) return null;
  if (todo.deletedAt) return null;
  todoService.deleteTodo({ uuid });
  res.json({ message: "Deleted successfully" }).status(httpStatus.OK);
};

export const deleteController = errorHandlerWrapper(deleteHandler);
