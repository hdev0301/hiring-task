import { param } from "express-validator";

export const deleteValidator = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("UUID is required."),
  ];
};
