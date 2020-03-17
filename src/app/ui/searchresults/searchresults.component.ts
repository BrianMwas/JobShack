import { Component, OnInit, Output } from '@angular/core';
import { SearchService } from '../search.service';
import { Job } from 'src/app/shared/models/job';
import { Observable } from 'rxjs';
import { filter, tap } from "rxjs/operators"
import { ActivatedRoute } from '@angular/router';
import { NbToastrService, NbGlobalPosition, NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {

  @Output()
  jobResults: Array<Job> = []

  searchTerm: Observable<String>;
  loading: boolean

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService
  ) { }


  ngOnInit() {

    this.route.queryParams
    .subscribe(search => {
      let params = { ...search.keys, ...search }
      console.log("params", params)
      this.searchTerm = params.term;
      if(search && search['term']) {
        this.searchService.getResultBySearchTerm(this.searchTerm)
        .subscribe(
          (res) => {
            this.loading = true;
            if(res['data'].length > 0) {
              for(var i = 0; i < res['data'].length; i++) {
                this.updateJobSearch(new Job(res['data'][i]))
              }
              this.showSuccessToastr('Search complete', 'bottom-right', 'success', 4000)
            }
          },
          (error) => {
            console.log("error", error)
            this.loading = false;
            this.showErrorToastr(error, 'bottom-right', 'danger', 4000);
          },
          () => {
            this.loading = false;
          }
        )
      }
    })
  }

  updateJobSearch(data) {
    this.jobResults.unshift(data)
  }


  showErrorToastr(error, position, type, duration) {
    this.toastrService.show("Sorry "+ error, "Search Error", { position, status: type, duration, preventDuplicates: true })
  }

  showSuccessToastr(message, position, type, duration) {
    this.toastrService.success(message, 'Search Success', {position, status: type, duration, preventDuplicates: true })
  }
}
