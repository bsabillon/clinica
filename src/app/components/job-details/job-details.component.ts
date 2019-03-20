import { Component, OnInit } from '@angular/core';
import { DataApiService } from "../../services/data-api.service";
import { JobInterface} from "../../models/job";
import { ActivatedRoute, Params} from "@angular/router";
import {applicationInterface} from "../../models/application";
import { UserInterface} from "../../models/user";
import {AngularFireAuth} from "@angular/fire/auth";
import {ModalComponent} from "../admin/list-jobs/list-jobs.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  constructor(private afsAuth: AngularFireAuth,private dataApi: DataApiService, private route: ActivatedRoute,public dialog: MatDialog) { }
  public job : JobInterface = {};
  public app : applicationInterface={};

  ngOnInit() {
    const idJob = this.route.snapshot.params['id'];
   this.getDetails(idJob);

  }

  getDetails (idJob: string):void{
    this.dataApi.getOneJob(idJob).subscribe(job => {
      this.job = job;
    });

  }

 onClick(){
   const confirmacion = confirm('Esta seguro de aplicar?');
 }
}
