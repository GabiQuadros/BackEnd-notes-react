import { v4 as creatUuid } from "uuid";

export class Notes {
  public _idNotes: string;
  private _filed: boolean;

  constructor(public _desc: string, public _det: string) {
    this._idNotes = creatUuid();
    this._filed = false;
  }

  public get id() {
    return this._idNotes;
  }

  public get des() {
    return this._desc;
  }

  public get det() {
    return this._det;
  }

  public get filed() {
    return this._filed;
  }

  public set det(det: string) {
    this._det = det;
  }

  public set desc(desc: string) {
    this._desc = desc;
  }

  public set filed(filed: boolean) {
    this._filed = filed;
  }

  public toJson() {
    return {
      idNotes: this._idNotes,
      desc: this._desc,
      det: this._det,
    };
  }
}
