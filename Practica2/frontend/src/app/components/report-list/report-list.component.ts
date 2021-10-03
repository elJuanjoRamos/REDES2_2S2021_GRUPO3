import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';



const ELEMENT_DATA: ReportModel[] = [];


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})


export class ReportListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'carnet', 'name', 'curso', "message", "icon"];
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  constructor(private _reportService: ReportService) { }

  ngOnInit(): void {
    this.getAll()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private async getAll(): Promise<void> {
    try {
      const data = await this._reportService.getAll();
      console.log(data);
      this.dataSource = new MatTableDataSource(data['data']);
    } catch (err) {
    }

  }

  public viewDetails(element: ReportModel) {

  }

}
