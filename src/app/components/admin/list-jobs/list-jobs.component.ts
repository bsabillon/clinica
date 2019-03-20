import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { DataApiService} from "../../../services/data-api.service";
import { JobInterface} from "../../../models/job";
import { NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from "@angular/material";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../../services/auth.service";
import {UserInterface} from "../../../models/user";
import * as firebase from 'firebase';


@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.component.html',
  styleUrls: ['./list-jobs.component.css']
})
export class ListJobsComponent implements OnInit {


  name: string;

  constructor(private dataApi: DataApiService, public dialog: MatDialog, private authService: AuthService) {
    this.getListJobs();
  }
  private jobs: JobInterface[];
  public  isAdmin: any = null;
  public userUid: string = null;

  displayedColumns: string[] = ['tittle',  'category', 'state', 'sponsor', 'schedule'
    , 'startDate', 'duration', 'admin'];
  dataSource = new MatTableDataSource();



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnInit() {
    this.getListJobs();
    this.getCurentUser();
  }

  getCurentUser(){
    this.authService.isAuth().subscribe(auth=>{
      if (auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole =>{
          this.isAdmin= Object.assign({},userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }

  getListJobs(){
    this.dataApi.getAllJobs().subscribe(jobs =>{
      this.dataSource.data =jobs
    });
  }

  onDeleteJob(idJob: string){
    const confirmacion = confirm('Esta seguro de eliminar?');
    if(confirmacion){
      this.dataApi.deleteJob(idJob);
    }

  }

  onPreUpdateJob(job: JobInterface){
    this.dataApi.selectedJob = Object.assign({},job );
    this.openDialog();
  }

}

export interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-modal',
  template: ` <ol>
    <form #formJob="ngForm" (ngSubmit)="onSaveJob(formJob)">
      <input type="hidden" name="id" [(ngModel)]="this.dataApi.selectedJob.id" >

      <mat-form-field >
        <input matInput placeholder="Titulo"  name="tittle" [(ngModel)]="this.dataApi.selectedJob.tittle">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Categoria" name="category" [(ngModel)]="this.dataApi.selectedJob.category">
      </mat-form-field>
      <mat-form-field>
        <mat-select placeholder="Estado" name="state" [(ngModel)]="this.dataApi.selectedJob.state">
          <mat-option *ngFor="let estado of estados" [value]="estado.viewValue">
            {{estado.viewValue}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Patrocinador" name="sponsor" [(ngModel)]="this.dataApi.selectedJob.sponsor">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Duracion" name="duration" [(ngModel)]="this.dataApi.selectedJob.duration">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Fecha inicio" name="startDate" [(ngModel)]="this.dataApi.selectedJob.startDate">
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Horario" name="schedule" [(ngModel)]="this.dataApi.selectedJob.schedule">
      </mat-form-field>
      <div class="form-group"  >
        <h5>Seleccionar imagen:</h5>
        <input type="file" accept=".png, .jpg"  (change)="onUpload($event)"  >
      </div>
      <mat-form-field class="cdk-visually-hidden">
        <input  matInput placeholder="logo" name="sponsorLogo" [(ngModel)]="this.dataApi.selectedJob.sponsorLogo">
      </mat-form-field>
      <div>
        <mat-form-field >
          <input  matInput placeholder="Descripcion" name="description" [(ngModel)]="this.dataApi.selectedJob.description">
        </mat-form-field>
      </div>

      <div>
        <button mat-raised-button type="submit" (click)="onClose(formJob)" color="primary">Aceptar</button>

      </div>
    </form>

  </ol>
  `,

  styleUrls: ['./list-jobs.component.css']
})


export class ModalComponent implements OnInit {

  estados: Estado[] = [
    {value: 'disponible-0', viewValue: 'Disponible'},
    {value: 'ocupada-1', viewValue: 'Ocupado'},
  ];
  constructor(public  dataApi: DataApiService, private storage: AngularFireStorage, public dialogRef: MatDialogRef<ModalComponent>) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('jobImage') inputJobImage: ElementRef;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  imageUrl: string;

  ngOnInit() {

  }


  onSaveJob(formJob: NgForm):void{
    //new
    if (formJob.value.id == null){
      formJob.value.id= Math.random().toString(36).substring(2);
      this.dataApi.addJob(formJob.value);
    } else {
      //update
      this.dataApi.updateJob(formJob.value);
    }
    formJob.reset();
    this.onClose(formJob);

  }

  onClose(formJob:NgForm): void {
    formJob.reset();
    this.dialogRef.close();
  }


  onUpload(e){

    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `logos/sponsor_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe(
      ()=>{},
      ()=>{},
      ()=>{
        ref.getDownloadURL().subscribe(
          (data)=>{
            this.imageUrl = data.toString();
            this.dataApi.selectedJob.sponsorLogo = this.imageUrl;
            console.log("data to URL"+data.toString())
          })
      }
    );

  }




}




