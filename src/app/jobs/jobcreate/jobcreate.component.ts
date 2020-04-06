import { Component, OnInit, ViewChild} from '@angular/core';
import * as country from "../../../assets/JSON/country.json";
import * as industry from "../../../assets/JSON/industry.json";
import * as jobtype from "../../../assets/JSON/job-type.json"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Job } from "../../shared/models/job"
import {  ActivatedRoute, Router } from "@angular/router"
import { JobService } from "../job.service"
import { NbToastrService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/states/app.state.model.js';


@Component({
  selector: 'app-jobcreate',
  templateUrl: './jobcreate.component.html',
  styleUrls: ['./jobcreate.component.scss']
})
export class JobcreateComponent implements OnInit {


	countries: any = (country as any).default;
  industries: any = (industry as any).default;
  jobtypes: any = (jobtype as any).default;

  job: Job = new Job("");
  updatingJob: boolean = false;

  jobLoaded: Boolean = false;

  jobf: FormGroup = new FormGroup({
    title: new FormControl(this.job.title, Validators.required),
    summary: new FormControl(this.job.summary, Validators.required),
    description: new FormControl(this.job.description, Validators.required),
    country: new FormControl(this.job.country, Validators.required),
    industry: new FormControl(this.job.industry, Validators.required),
    type: new FormControl(this.job.type, Validators.required)
  })



  changeCountry(e) {
    this.jobf.get('country').setValue(e.target.value);
  }

  changeIndustry(e) {
    this.jobf.get('industry').setValue(e.target.value);
  }

  changeJobType(e) {
    this.jobf.get('type').setValue(e.target.value);
  }

  onSubmit() {
    console.log(JSON.stringify(this.jobf.value))
  }


  constructor(
    protected route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private toastrService: NbToastrService,
    public accessChecker: NbAccessChecker,
    private store: Store<AppState>
     ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap.has('jobId')) {   
      this.updatingJob = true
      
      setTimeout(() => {
        this.store.select(store => store.job)
        .subscribe((j) => {
          this.job = j.job
          
          console.log("job", j)
          this.populateJob()
        },
        (err) => {
          console.log(err)
        },
        () => {
          this.jobLoaded = true
        }
        )      
      }, 1000)
    } else {
      this.jobLoaded = true
    }
  }


  populateJob() {
    console.log("this.job", this.job)
    this.jobf.setValue({
        title: this.job.title,
        summary: this.job.summary,
        description: this.job.description,
        country: this.job.country,
        industry: this.job.industry,
        type: this.job.type
      })
  }

  saveJob() {
    console.log("alright")
    if(this.route.snapshot.paramMap.has('jobId')) {
      console.log("yeah")
      this.jobService.updateJob(
        this.route.snapshot.paramMap.get('companyId'),
        this.route.snapshot.paramMap.get('jobId'),
        this.jobf.value).subscribe((res) => {
          this.toastrService.success("Job updated successfully", "Update", { preventDuplicates: true, duration: 3000 })
        }, 
        (err) => {
          this.toastrService.warning("Job update failed", "Update", { preventDuplicates: true, duration: 3000 })

        }, 
        () => {
          this.router.navigate(['/'])
        })
    } else {

      this.jobService.postJob(
        this.route.snapshot.paramMap.get('companyId'),
        this.jobf.value).subscribe(
          (res) => {
            console.log("res", res)
          },
          (error) => {
            console.log("error adding job", error)
            this.toastrService.danger("Adding the job failed", "Error", { preventDuplicates: true, icon: 'alert-circle-outline', iconPack: 'eva' })
          },
          () => {
            this.toastrService.success("Added job successfully", "Success", { preventDuplicates: true, icon: 'checkmark-square-outline', iconPack: 'eva' })
            this.jobf.reset()
            this.router.navigate(['/'])
          }
        )
    }
  }
}
