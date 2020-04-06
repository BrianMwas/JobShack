import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JobService } from 'src/app/jobs/job.service';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-category-results',
  templateUrl: './category-results.component.html',
  styleUrls: ['./category-results.component.scss']
})
export class CategoryResultsComponent implements OnInit {

  searchTerm: Observable<string>

  @Output()
  jobs: Array<Job>

  loading: boolean = true

  constructor(private activatedRouter: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(t => {
      let params = { ...t.keys, ...t };
      // console.log("params", params.query)
      this.searchTerm = params.query;
      if(t && t['query']) {
        this.jobService.getJobsByCategory(this.searchTerm)
        .subscribe(
          (res) => {
            this.jobs = [...res]
            console.log("jobs", this.jobs)
          },
          (err) => {
            this.loading = false
          },
          () => {
            this.loading = false
          }
        )
      }
    })
  }
}
