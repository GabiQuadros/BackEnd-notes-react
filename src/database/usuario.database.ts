import { usuario } from "./usuario";
import { User } from "../models/usuario.models";

export class UserDataBase {
  public list() {
    return [...usuario];
  }

  public getUserEmail(email: string) {
    return usuario.find((user) => user.email === email);
  }

  public getUserId(id: string) {
    return usuario.find((user) => user.id === id);
  }

  public getUserIndex(id: string) {
    return usuario.findIndex((user) => user.id === id);
  }

  public create(user: User) {
    usuario.push(user);
  }

  public delete(index: number) {
    usuario.splice(index, 1);
  }
}
