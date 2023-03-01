import { Router } from "express";
import { NoteController } from "../controller/notes.controller";

export const notesRoutes = () => {
  const app = Router();
  app.post("/:id/notes", new NoteController().create);
  app.get("/:id/notes", new NoteController().list);
  app.delete("/:id/notes/:idNotes", new NoteController().delete);
  app.put("/:id/notes/:idNotes", new NoteController().update);
  return app;
};
