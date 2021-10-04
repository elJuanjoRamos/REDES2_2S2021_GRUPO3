import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

import { ReportModel } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';


const ELEMENT_DATA: ReportModel[] = [];


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})


export class ReportListComponent implements OnInit {

  public report: ReportModel = {
    id: '',
    carnet: 0,
    nombre: '',
    curso: '',
    mensaje: ''
  }

  displayedColumns: string[] = ['id', 'carnet', 'name', 'curso', "message", "icon"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  carnetInput = '';


  constructor(
    private _reportService: ReportService, 
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateCarnet(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.carnetInput = filterValue;
  }

  public async getAll(): Promise<void> {
    try {
      const data = await this._reportService.getAll();
      this.dataSource = new MatTableDataSource(data['data']);
      if (data['code'] === '200') {
        this._snackBar.open(`Listo! ${data['message']}`, 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-accent']});
      }
    } catch (err) {
    }

  }

  public async search(): Promise<void> {
    try {
      const data = await this._reportService.getAllCarnet(this.carnetInput);
      this.dataSource = new MatTableDataSource(data['data']);
      if (data['code'] === '200') {
        this._snackBar.open(`Listo! ${data['message']}`, 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-accent']});
      }
    } catch (err) {
    }

  }

  public async viewDetails(id: string): Promise<void> {
    try {
      const data = await this._reportService.getReportDetail(id);
      if (data['code'] === '200') {
        localStorage.setItem('report', JSON.stringify(data['data'][0]));
        localStorage.setItem('procesado', JSON.stringify(data['message']));
      }
    } catch (err) {
    }
    this.openDialog();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';

    this.dialog.open(ReportDialogComponent, dialogConfig);
}

}
