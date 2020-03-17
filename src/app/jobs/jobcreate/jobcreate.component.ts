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
import { loadJob } from 'src/app/shared/actions/singleJob.actions.js';

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
    if(this.route.snapshot.paramMap.has('id')) {
      let id = this.route.snapshot.paramMap.get('id')

      this.store.dispatch(loadJob({ id }))

      this.store.select(store => store.job).subscribe(j => {
        this.job = j.job
      })

      this.jobf.setValue({
        title: this.job.title,
        summary: this.job.summary,
        description: this.job.description,
        country: this.job.country,
        industry: this.job.industry,
        type: this.job.type
      })
    }
  }

  saveJob() {
    console.log("alright")
    if(this.route.snapshot.paramMap.has('id')) {
      console.log("yeah")
      this.jobService.updateJob(
        this.route.snapshot.paramMap.get('companyId'),
        this.route.snapshot.paramMap.get('id'),
        this.jobf.value)
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
