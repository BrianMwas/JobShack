import { UserService } from './../../auth/user.service';
import { Job } from '../../shared/models/job';

import { Component, OnInit, Output, Inject, EventEmitter, Input } from "@angular/core";
import { NbSidebarService, NbSearchService, NbMenuService, NB_WINDOW, NbThemeService } from "@nebular/theme";
import { NbAuthJWTToken, NbAuthService, NbTokenService } from "@nebular/auth"
import { tap, filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { loggedInUserLoad } from 'src/app/shared/actions/auth.actions';
import { ProfileState } from 'src/app/shared/models/states/auth.state.model';
@Component({
	selector: "app-navigation",
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})


export class NavigationComponent implements OnInit {
	public user: User
	userId: Observable<string>;
	@Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() searchResults: EventEmitter<Job[]> = new EventEmitter<Job[]>();

	searchTerm = '';

	items = [
		{
			title: 'Log out',
			icon: 'log-out-outline'
		}
	]

	@Input()
	loggedIn: boolean;
	profileDefined: boolean;
	darkMode: boolean = true;


	constructor (
		private sidebarService: NbSidebarService,
		private authService: NbAuthService,
		private searchService : NbSearchService,
    	private router: Router,

		private nbMenuService: NbMenuService,
		private nbTokenService: NbTokenService,
		public themeService: NbThemeService,
		private store: Store<AppState>
		) { }

	ngOnInit() {
		this.store.select(store => store.authUser.user).subscribe(res => {
			this.user = res
		})

		this.searchService.onSearchSubmit()
		.subscribe((data: any) => {
			this.searchTerm = data.term;
			this.router.navigate(['search'], { queryParams: { term: this.searchTerm }})
		})
		
		// this.checkProfile(this.store.select(store => store.authUserProfile))
		this.store.select(store => store.authUserProfile).subscribe(res => {
			if(res == null) {
				this.profileDefined = false
			} else {
				this.profileDefined = true
			}
		})

		this.nbMenuService.onItemClick()
		.pipe(
			filter(({ tag }) => tag === 'userMenu'),
			map(({ item: { title } }) => title)
		).subscribe(
			title =>  {
				this.authService.logout('email')
				this.nbTokenService.clear()
				this.router.navigate(['/'])
			}
		)
	}

	toggle() {
		this.sidebarService.toggle(false, "left")
	  }
	
	// checkProfile(p: Observable<ProfileState>) {
	// 	p.subscribe(res => {
	// 		if(res.userProfile == undefined) {
	// 			this.profileDefined = false;
	// 		} else {
	// 			this.profileDefined = true;
	// 		}
	// 	})
		
	// }

  toggleTheme() {
    if(this.darkMode) {
      this.themeService.changeTheme('default')
      this.darkMode = false
    } else {
      this.themeService.changeTheme('dark')
      this.darkMode = true
    }
  }
}

