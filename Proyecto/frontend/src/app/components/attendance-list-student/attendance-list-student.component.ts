import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { AttendanceModel } from 'src/app/models/attendance.model';
import { AttendanceReportModel } from 'src/app/models/report_attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';


@Component({
  selector: 'app-attendance-list-student',
  templateUrl: './attendance-list-student.component.html',
  styleUrls: ['./attendance-list-student.component.css']
})
export class AttendanceListStudentComponent implements OnInit, AfterViewInit{
  public displayedColumns: string[]
  public dataSource: any;
  public events: AttendanceReportModel[]
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private _service: AttendanceService,
    public _snackBar: MatSnackBar
  ) {
    this.displayedColumns = ['evento', 'idEvento', 'foto', 'fecha'];
    this.dataSource = new MatTableDataSource<AttendanceReportModel>();
    this.events = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!
  }

  async getData(value: any): Promise<void> {
    const data = await this._service.getAttendantById(value)
    this.dataSource = new MatTableDataSource(data['data']);
    if (data['code'] === '200') {
      this._snackBar.open(`Listo! ${data['message']}`, 'Ok', { duration: 2000, panelClass: ['mat-toolbar', 'mat-accent']});
    }
  }

  showSnackbar(message: string = 'Ha ocurrido un error') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
