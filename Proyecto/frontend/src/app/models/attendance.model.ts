export class AttendanceModel {
  constructor(
    public id?:number,
    public carnet?: number,
    public nombre?:string,
    public evento?: string,
    public imgbase64?: string,
    public procesado?: string,
    public fecha?: string
  ){

  }
}
