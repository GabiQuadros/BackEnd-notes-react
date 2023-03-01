import { Request, Response } from "express";
import { UserDataBase } from "../database/usuario.database";
import { Notes } from "../models/notes.models";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";

export class NoteController {
  public list(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { desc, det } = req.query;
      // const isFiled = filed.toString().toLowerCase() === "true";

      const database = new UserDataBase();
      const user = database.getUserId(id);

      let noteList = user?.notes;

      if (desc) {
        noteList = noteList?.filter(
          (note) =>
            note.desc.toString().toLowerCase() ===
            desc?.toString().toLowerCase()
        );
      }

      // if (isFiled !== undefined) {
      //   noteList = noteList?.filter((note) => note.filed === isFiled);
      // }

      res.status(200).send({
        ok: true,
        message: "Lista de Recados",
        data: noteList,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { desc, det } = req.body;

      const database = new UserDataBase();
      const user = database.getUserId(id);

      if (!desc || !det) {
        return res.status(400).send({
          ok: false,
          message: "Notes ware not provided",
        });
      }
      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "usuario not found",
        });
      }

      user.notes = user.notes.concat(new Notes(desc, det));

      return res.status(201).send({
        ok: true,
        message: "Note successfully created",
        data: user,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { id, idNotes } = req.params;

      const database = new UserDataBase();
      const user = database.getUserId(id);

      const noteList = user!.notes;

      const noteIndex = noteList.findIndex((note) => note.id === idNotes);

      if (noteIndex < 0) {
        return RequestError.notFound(res, "Note");
      }

      user?.notes.splice(noteIndex, 1);
      return res.status(200).send({
        ok: true,
        message: "Note successfully deleted",
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { id, idNotes } = req.params;
      const { desc, det } = req.body;

      const database = new UserDataBase();
      const user = database.getUserId(id);

      let noteEdit = user?.notes.find((notes) => {
        return notes.id === idNotes;
      });

      if (!noteEdit) {
        return res.status(404).send({
          ok: false,
          message: "Note not found",
        });
      }
      if (desc) {
        noteEdit.desc = desc;
      }
      if (det) {
        noteEdit.det = det;
      }

      return res.status(200).send({
        ok: true,
        message: "Note successfully updated",
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public filter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const database = new UserDataBase();

      let filterUser = database.getUserId(id);
      if (!filterUser) {
        return RequestError.notFound(res, "User");
      }
      return res.status(200).send({
        ok: true,
        message: "Notes successfully listed",
        data: filterUser?.notes,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
