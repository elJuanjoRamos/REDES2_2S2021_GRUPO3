import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReportModel } from 'src/app/models/report.model'
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {

  public report: ReportModel = {
    idReport: 0,
    carnet: 0,
    name: '',
    curso: '',
    message: ''
  }

  constructor(private reportService: ReportService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public async send() {
    if(this.report.carnet == 0 || this.report.name == '' || this.report.curso == '' || this.report.message == ''){
      this._snackBar.open('Atención. Debe llenar todos los campos.', 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn']});
    }else{
      try {
        const data = await this.reportService.publish(this.report);

        if (data[1] === '200') {
          this._snackBar.open('Atención. Debe llenar ambos campos.', 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-warn']});
        }
      } catch (err) {
        this._snackBar.open('Error. Intenta nuevamente.', 'Ok', { duration: 2000, panelClass: ['mat-toolbar','mat-warn']});
        console.log(<any>err);
      }
    }
    this.report.carnet = 0;
    this.report.name = '';
    this.report.curso = '';
    this.report.message = '';
  }

}