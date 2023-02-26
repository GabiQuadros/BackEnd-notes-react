import { Request, Response } from "express";
import { UserDataBase } from "../database/usuario.database";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";
import { User } from "../models/usuario.models";

export class UserController {
  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const database = new UserDataBase();
      let usuario = database.getUserEmail(email);

      if (!usuario) {
        return RequestError.notFound(res, "User");
      }

      return res.status(200).send({
        ok: true,
        message: "User found successfully",
        data: usuario,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const newUser = new User(email, password);
      const dataBase = new UserDataBase();
      if (email === "" || password === "") {
        return res.status(404).send({
          ok: false,
          message: "Preencha todos campos)",
        });
      }
      if (password < 5) {
        return res.status(404).send({
          ok: false,
          message: " A senha precisa de pelo menos 5 digitos",
        });
      }
      dataBase.create(newUser);
      return res.status(200).send({
        ok: true,
        message: "O usuário foi criado com sucesso",
        data: newUser.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString("Internal Serve Error"),
      });
    }
  }

  public list(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const database = new UserDataBase();
      let usuario = database.list();

      if (email) {
        usuario = usuario.filter((usuario) => usuario.email === email);
      }

      res.status(200).send({
        ok: true,
        message: "Lista de Usuarios",
        data: usuario.map((item) => item.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString("Internal Serve Error"),
      });
    }
  }
}
