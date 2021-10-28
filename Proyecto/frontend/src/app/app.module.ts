import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReportListComponent } from './components/report-list/report-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from "@angular/material/dialog";
import { HttpClientModule } from '@angular/common/http';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { ReportDialogComponent } from './components/report-dialog/report-dialog.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { AttendanceListEventComponent } from './components/attendance-list-event/attendance-list-event.component';
import { AttendanceListStudentComponent } from './components/attendance-list-student/attendance-list-student.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportFormComponent,
    ReportDialogComponent,
    AttendanceComponent,
    AttendanceFormComponent,
    AttendanceListEventComponent,
    AttendanceListStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    MatGridListModule,
    MatPaginatorModule
  ],
  providers: [
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ReportDialogComponent]
})
export class AppModule { }
