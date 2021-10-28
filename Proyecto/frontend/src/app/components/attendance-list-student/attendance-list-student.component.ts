import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { AttendanceModel } from 'src/app/models/attendance.model';


@Component({
  selector: 'app-attendance-list-student',
  templateUrl: './attendance-list-student.component.html',
  styleUrls: ['./attendance-list-student.component.css']
})
export class AttendanceListStudentComponent implements OnInit, AfterViewInit{
  public displayedColumns: string[]
  public dataSource: any;
  public events: AttendanceModel[]
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<AttendanceModel>();
    this.displayedColumns = ["carnet", "name", "date"]
    this.events = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!
  }

  async getData(): Promise<void> {
    //TODO: traer eventos por estudiante
  }

  showSnackbar(message: string = 'Ha ocurrido un error') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
