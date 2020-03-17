import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SEOService } from '../../shared/services/seo.service';
import { Component, OnInit } from "@angular/core";
import { filter, map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
	selector: "app-about",
	templateUrl: "./about.component.html",
	styleUrls: ["./about.component.scss"]
})

export class AboutComponent implements OnInit {

	title = "About"
	
	constructor () {}
	ngOnInit() {
	}
}
