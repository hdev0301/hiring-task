import httpStatus from "http-status";
import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await encryptPassword(password);

  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });

  res.json({ username, email }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
