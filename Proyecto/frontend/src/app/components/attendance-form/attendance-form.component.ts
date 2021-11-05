import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttendanceModel } from 'src/app/models/attendance.model';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css']
})

export class AttendanceFormComponent implements OnInit {
  public uploadedImage: string;
  public attendance: AttendanceModel;
  public screenImage: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _service: AttendanceService
  ) {
    this.uploadedImage = "";
    this.attendance = new AttendanceModel();
    this.screenImage = false;
  }

  ngOnInit(): void {
  }

  public async register(Form: NgForm): Promise<void> {
    try {
      if(!this.screenImage){
        this.showSnackbar("Falta la captura de tu asistencia")
        return
      }
      const data = await this._service.publish(this.attendance);
      console.log(data)
      if (data['code'] === '200') {
        this.showSnackbar(data['message'])
      } else {
        console.log(data)
      }

    } catch (error) {
      Form.resetForm()
      this.screenImage = false;
      this.showSnackbar("Ha ocurrido un error")
    }
  }

  uploadImage(event: any): any {
    try {
      const file = (event.target as HTMLInputElement).files![0];
      if (file) {
        this.convertbase64(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.uploadedImage = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.screenImage = true;
      }
    } catch (err) {
      this.showSnackbar("Ha ocurrido un error al subir un nuevo archivo ")
    }

  }

  private convertbase64(img: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.attendance.file = img;
    };
    reader.readAsDataURL(img);
  }

  showSnackbar(message: string = 'Ha ocurrido un error') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
