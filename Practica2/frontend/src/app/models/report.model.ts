export class ReportModel {
  constructor(
    public id?:string,
    public carnet?: number,
    public nombre?:string,
    public curso?: string,
    public mensaje?: string,
    public procesado?: string,
    public fecha?: string
  ){

  }
}
