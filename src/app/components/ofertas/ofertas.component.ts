import { Component, OnInit } from '@angular/core';
import { DataApiService} from "../../services/data-api.service";
import {JobInterface} from "../../models/job";


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public  jobs = [];





  ngOnInit() {
    this.dataApi.getAllJobs().subscribe(jobs =>{
      this.jobs = jobs;
    })

  }

}
