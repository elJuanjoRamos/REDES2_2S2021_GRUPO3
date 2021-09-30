import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';



const ELEMENT_DATA: ReportModel[] = [
  { idReport: 1, carnet: 201801156, name: 'Harry Styles', curso: "Lenguajes", message: 'H' },
  { idReport: 2, carnet: 201801256, name: 'Zayn Malik', curso: "Matematicas", message: 'Se salio de la clase' },
  { idReport: 3, carnet: 201801569, name: 'Lithium', curso: "Lenguajes", message: 'Li' },
  { idReport: 4, carnet: 201805744, name: 'Beryllium', curso: "Lenguajes", message: 'Be' },
  { idReport: 5, carnet: 201807896, name: 'Boron', curso: "Lenguajes", message: 'B' },
  { idReport: 6, carnet: 201679374, name: 'Carbon', curso: "Lenguajes", message: 'C' },
  { idReport: 7, carnet: 201709793, name: 'Nitrogen', curso: "Lenguajes", message: 'N' },
  { idReport: 8, carnet: 201801167, name: 'Oxygen', curso: "Lenguajes", message: 'O' },
  { idReport: 9, carnet: 201801196, name: 'Fluorine', curso: "Lenguajes", message: 'F' },
  { idReport: 10, carnet: 201801154, name: 'Neon', curso: "Lenguajes", message: 'Ne' },
];


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})


export class ReportListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'carnet', 'name', 'curso', "message", "icon"];
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  constructor(/*private _reportService: ReportService*/) { }

  ngOnInit(): void {
    this.getAll()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private async getAll(): Promise<void> {
    try {
      //const data = await this._reportService.getAll();
      //this.dataSource = new MatTableDataSource(data);

    } catch (err) {

    }

  }

}
