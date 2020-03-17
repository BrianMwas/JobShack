import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/shared/models/application';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/states/app.state.model';

@Component({
  selector: 'app-applicationdetail',
  templateUrl: './applicationdetail.component.html',
  styleUrls: ['./applicationdetail.component.scss']
})
export class ApplicationdetailComponent implements OnInit {

  application: Observable<Application>

  constructor(private store : Store<AppState>) { }

  ngOnInit() {
  }

}
