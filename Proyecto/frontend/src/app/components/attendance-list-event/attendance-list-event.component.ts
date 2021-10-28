import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-attendance-list-event',
  templateUrl: './attendance-list-event.component.html',
  styleUrls: ['./attendance-list-event.component.css']
})
export class AttendanceListEventComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[];
  public dataSource: any;
  public students: StudentModel[]

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public _snackBar: MatSnackBar
  ) {
    this.displayedColumns = ['id', 'name', 'date'];
    this.dataSource = new MatTableDataSource<StudentModel>();
    this.students = [];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!
  }

  async getData(): Promise <void> {
    //TODO: Traer estudiantes por evento
  }

  showSnackbar(message: string = 'Ha ocurrido un error') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
