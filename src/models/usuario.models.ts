import { v4 as creatUuid } from "uuid";
import { Notes } from "./notes.models";

export class User {
  private _id: string;
  private _notes: Notes[];

  constructor(private _email: string, private _password: string) {
    this._id = creatUuid();
    this._notes = [];
  }

  public get notes() {
    return this._notes;
  }
  public set notes(notes: Notes[]) {
    this._notes = notes;
  }
  public addNotes(notes: Notes) {
    this.notes.push(notes);
  }
  public get id() {
    return this._id;
  }
  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get password() {
    return this._password;
  }

  public toJson() {
    return {
      id: this._id,
      notes: this._notes,
      email: this._email,
    };
  }
}
