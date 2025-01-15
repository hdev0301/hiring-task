import { param } from "express-validator";

export const deleteValidator = () => {
  return [
    param("uuid")
      .notEmpty()
      .withMessage("UUID is required."),
  ];
};
