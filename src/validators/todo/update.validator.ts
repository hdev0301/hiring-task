import { param } from "express-validator";

export const updateValidator = () => {
  return [
    param("uuid")
      .notEmpty()
      .withMessage("UUID is required."),
  ];
};
