import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return await this._httpClient.get(`${this.url}/all`).toPromise()
  }

  public async getAllCarnet(carnet: string): Promise<any> {
    return await this._httpClient.get(`${this.url}/all/${carnet}`).toPromise()
  }

  public async getReportDetail(id: string): Promise<any> {
    return await this._httpClient.get(`${this.url}/repo/${id}`).toPromise()
  }

  public async publish(user: ReportModel): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      `${this.url}/publicar`,
      json,
      { headers }
    ).toPromise();
  }
}
