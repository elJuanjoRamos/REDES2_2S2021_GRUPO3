import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportModel } from '../models/report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}`
  }

  public async getAll(): Promise<any> {
    return await this._httpClient.get(`${this.url}/getAll`).toPromise()
  }
}
