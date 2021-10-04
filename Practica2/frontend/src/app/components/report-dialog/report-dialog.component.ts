import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'src/app/models/report.model'
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  //public report: ReportModel;

  public report: ReportModel = {
    id: '',
    carnet: 0,
    nombre: '',
    curso: '',
    mensaje: ''
  }

  constructor() {
    this.report = <ReportModel>JSON.parse(localStorage.getItem('report')!);
    this.report.procesado = JSON.parse(localStorage.getItem('procesado')!);
    console.log(this.report)
   }

  ngOnInit(): void {
  }

}
