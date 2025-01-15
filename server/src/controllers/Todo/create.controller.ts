import httpStatus from "http-status";
import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const createHandler = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const todo = await todoService.createTodo({
    title,
    description,
    status,
    dueDate,
  });
  res.json({ todo }).status(httpStatus.CREATED);
};


export const createController = errorHandlerWrapper(createHandler);
