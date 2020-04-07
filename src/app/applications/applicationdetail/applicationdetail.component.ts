import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/shared/models/application';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { ApplicationService } from '../application.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthState } from 'src/app/auth/model/auth.states.model';
import { map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-applicationdetail',
  templateUrl: './applicationdetail.component.html',
  styleUrls: ['./applicationdetail.component.scss']
})
export class ApplicationdetailComponent implements OnInit {

  application: Application
  loading: Observable<Boolean>

  constructor(private store: Store<AuthState>,private dialService: NbToastrService, private router: Router) { }

  ngOnInit() {
    // console.log("store", this.store.select(store => store.application));
    setTimeout(() => {
      this.store.select(store => store.application)
      .subscribe(res => {
        console.log("res app", res.application);
        this.application = res.application;
      });
    });
    this.loading = this.store.select(store => store.application.loading);
    this.store.select(store => store.application.error)
    .subscribe(error => {
      console.info("error", error);
    })
  }
}
