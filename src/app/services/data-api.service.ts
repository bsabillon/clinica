import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import { JobInterface } from "../models/job";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {applicationInterface} from "../models/application";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {
    this.jobsCollection = afs.collection<JobInterface>('jobs');
    this.jobs = this.jobsCollection.valueChanges();

  }
  private jobsCollection: AngularFirestoreCollection<JobInterface>;

  private jobs : Observable<JobInterface[]>;
  private jobDoc: AngularFirestoreDocument<JobInterface>;
  private job: Observable<JobInterface>;
  public  selectedJob: JobInterface = {
    id:null
  };


  getAllJobs(){
    //this.jobsCollection = afs.collection<JobInterface>('jobs');
    return this.jobs =this.jobsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as JobInterface;
          data.id = action.payload.doc.id;
          return data;
        })
      }));
  }

  getOneJob(idJob: string){
    this.jobDoc = this.afs.doc<JobInterface>(`jobs/${idJob}`);
    return this.job = this.jobDoc.snapshotChanges().pipe(map(action =>{
      if (action.payload.exists == false){
        return null;
      } else {
        const data = action.payload.data() as JobInterface;
        data.id = action.payload.id;
        return  data;
      }
    }));

  }

  addJob(job: JobInterface):void{
    this.jobsCollection.add(job);

  }



  updateJob(job: JobInterface):void{
  let idJob = job.id;
  this.jobDoc = this.afs.doc<JobInterface>(`jobs/${idJob}`);
  this.jobDoc.update(job);
  }

  deleteJob(idJob: string):void{
    this.jobDoc = this.afs.doc<JobInterface>(`jobs/${idJob}`);
    this.jobDoc.delete();

  }


}
