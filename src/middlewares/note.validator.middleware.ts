import { NextFunction, Request, Response } from "express";
import { UserDataBase } from "../database/usuario.database";
import { ServerError } from "../error/server.error";
import { RequestError } from "../error/request.error";

export class NoteValidatorMiddleware {
  public static userExist(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        return RequestError.fieldNotProvided(res, "User");
      }

      const database = new UserDataBase();
      const user = database.getUserId(id);

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public static userAndNoteExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, idNotes } = req.params;

      if (!id) {
        return RequestError.fieldNotProvided(res, "user");
      }

      if (!idNotes) {
        return RequestError.fieldNotProvided(res, "Notes");
      }

      const database = new UserDataBase();
      const user = database.getUserId(id);

      if (!user) {
        return RequestError.notFound(res, "User");
      }

      const note = user?.notes.find((notes) => notes.id === idNotes);

      if (!note) {
        return RequestError.notFound(res, "Notes");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public static mandatoryFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { det, _desc } = req.body;

      if (!det) {
        return RequestError.fieldNotProvided(res, "det");
      }

      if (!_desc) {
        return RequestError.fieldNotProvided(res, "_desc");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
