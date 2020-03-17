import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { JobService } from "../../jobs/job.service";
import {Job} from "../../shared/models/job";
import { Component, OnInit, Output } from '@angular/core';
import * as country from "../../../assets/JSON/country.json";
import * as industry from "../../../assets/JSON/industry.json";
import * as jobtype from "../../../assets/JSON/job-type.json"


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, mergeMap } from 'rxjs/operators';
import { query } from '@angular/animations';
import { FilestackService } from '@filestack/angular';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AllJobs, AllJobsLoading } from 'src/app/shared/actions/joblist.actions';
import { NbToastrService } from '@nebular/theme';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class homeComponent implements OnInit {

  @Output()
  initJobs: Job[] = [];

  @Output()
  allJobs: Observable<Job[]>;

  loadingJobs: Observable<Boolean>

  countries: any = (country as any).default;
  industries: any = (industry as any).default;
  jobtypes: any = (jobtype as any).default;

  categories: FormGroup = new FormGroup({
    country: new FormControl(''),
    industry: new FormControl(''),
    jobtype: new FormControl('')
  })

  apikey: string
  file: any

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  })



  constructor(private searchService: SearchService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<AppState>, private fileStackService: FilestackService, private snackService : NbToastrService, private jobService: JobService ) { }


  ngOnInit() {
    this.logJobs(this.store.select(store => store.jobs))    
    this.loadingJobs = this.store.select(store => store.jobs.loading)
    this.fileStackService.init('YOUR_API_KEY');
  }

  logJobs(jobs: any) {
    jobs.subscribe(log => this.allJobs = log['jobs'])
  }

  changeCountry(e) {
    this.categories.get('country').setValue(e.target.value);
  }

  changeIndustry(e) {
    this.categories.get('industry').setValue(e.target.value);
  }

  changeJobType(e) {
    this.categories.get('jobtype').setValue(e.target.value);

  }

  onSubmit() {
    if(this.categories.invalid) {
      return;
    }

    let searchObj = this.categories.value

    console.log("search Obj", searchObj)

    for(var p in searchObj) {
      if(searchObj[p] == null || searchObj[p].length <= 0) {
        delete searchObj[p]
      }
    }

    let q = Object.keys(searchObj).map(key => key + "=" + searchObj[key]).join("&");
    
    if(q.length > 0) {
      // console.log("search", q)
      this.router.navigate(['/categories'], { queryParams: { query: q } })
      // this.searchService.getResultsFromJobProperties(q)
      this.categories.reset()
    } else {
      this.snackService.warning("Please make a selection first", "Search", { preventDuplicates: true })
    }

  }


  subscribe() {
    if(this.emailForm.valid)
      console.log("subscribe", this.emailForm.value)
      this.emailForm.reset()
  }

  gotoResumeIO() {
    this.router.navigate(['https://resume.io'])
  }
}

