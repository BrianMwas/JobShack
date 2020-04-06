import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/shared/models/application';
import { ApplicationService } from '../application.service';
import { map, tap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth/model/auth.states.model';
import { loadApplications } from 'src/app/auth/actions/application.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applicationlist',
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.scss']
})
export class ApplicationlistComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    public applicationService: ApplicationService,
    private store: Store<AuthState>,
    private router: Router
    ) { }
    applications: Application[]
    loadingApplications: Observable<boolean>

  ngOnInit() {

    console.log("applications", this.route.snapshot.paramMap.get('jobId'))
    
    setTimeout(() => {
      this.store.select(store => store.applications).subscribe(res => {
        
        console.log("yes", res)
        this.applications = res.applications
      })
    }, 1000)

    this.loadingApplications = this.store.select(store => store.applications.loading)
  }


  goto(id) {
    this.router.navigate(['application/detail', id])
  }
}
