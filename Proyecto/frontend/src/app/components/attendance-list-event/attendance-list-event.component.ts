import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { AttendanceReportModel } from 'src/app/models/report_attendance.model';
import { StudentModel } from 'src/app/models/student.model';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-list-event',
  templateUrl: './attendance-list-event.component.html',
  styleUrls: ['./attendance-list-event.component.css']
})
export class AttendanceListEventComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[];
  public dataSource: any;
  public students: AttendanceReportModel[]

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public _snackBar: MatSnackBar,
    private _service: AttendanceService
  ) {
    this.displayedColumns = ['name', 'carnet', 'evento', 'foto', 'fecha'];
    this.dataSource = new MatTableDataSource<AttendanceReportModel>();
    this.students = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!
  }

  async getData(value: any): Promise <void> {
    const data = await this._service.getAttendantByEvent(value)
    this.dataSource = new MatTableDataSource(data['data']);
      if (data['code'] === '200') {
        this._snackBar.open(`Listo! ${data['message']}`, 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-accent']});
      }
  }

  showSnackbar(message: string = 'Ha ocurrido un error') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
