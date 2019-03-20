import { Component, OnInit } from '@angular/core';
import {DataApiService} from "../../services/data-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  public  jobs = [];


  ngOnInit() {
    this.dataApi.getAllJobs().subscribe(jobs =>{
      this.jobs = jobs;
    })
  }

}
