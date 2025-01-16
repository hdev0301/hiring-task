import httpStatus from "http-status";
import { todoService } from "../../services";
import { errorHandlerWrapper } from "../../utils";

const updateHandler = async (req, res) => {
  const user = req.user;
  const { uuid } = req.params;
  const { title, description, status, dueDate } = req.body;
  const updatedTodo = await todoService.updateTodo({
    uuid,
    title,
    description,
    status,
    dueDate,
    user,
  });

  res.json(updatedTodo).status(httpStatus.CREATED);
};

export const updateController = errorHandlerWrapper(updateHandler);
