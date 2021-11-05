import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AttendanceModel } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {
    public url: string;
  
    constructor(private _httpClient: HttpClient) {
      this.url = `${environment.url1}`
    }
  
    
  
    
    
  
    public async publish(asistencia: AttendanceModel): Promise<any> {
      
      const formData: FormData = new FormData();
      formData.append('file', asistencia.file);
      formData.append('nombre', asistencia.nombre);
      formData.append('carnet', asistencia.carnet);
      formData.append('evento', asistencia.evento);
      formData.append('idEvento', asistencia.idEvento);


      return await this._httpClient.post(
        `${this.url}/asistencia`,
        formData
      ).toPromise();
    }

    public async getAttendantById(id: string): Promise<any> {
      return await this._httpClient.get(`${this.url}/asistencia/carnet/${id}`).toPromise()
    }
    public async getAttendantByEvent(id: string): Promise<any> {
      return await this._httpClient.get(`${this.url}/asistencia/evento/${id}`).toPromise()
    }
  }
  