import { Router } from "express";
import { UserController } from "../controller/usuario.controller";
import { LoginValidatorMiddleware } from "../middlewares/login.validator.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post("/", new UserController().create);
  app.get("/", new UserController().list);
  app.post(
    "/login",
    LoginValidatorMiddleware.loginValidator,
    new UserController().login
  );
  return app;
};
