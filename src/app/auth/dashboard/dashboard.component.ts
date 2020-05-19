import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from './../user.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { CompanyService } from '../company.service';
import { FilestackService } from '@filestack/angular';
import { Profile } from 'src/app/shared/models/profile';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { loggedInUserLoad, userProfileLoad } from 'src/app/shared/actions/auth.actions';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  	userInfo: Observable<object>;

	@Output()
	currentUser: User;
	file: any;

	loadingUser: Observable<Boolean>
	loadingProfile: Observable<Boolean>

	fileStackApiKey: string
	profileChanged: boolean = true;

	@Output()
	userProfile: Profile;

	constructor(
		private store: Store<AppState>, 
		private userService: UserService, 
		protected companyService: CompanyService, 
		protected router: Router,
		private authService: NbAuthService,
		private toastrService : NbToastrService
		) {
	}

	pForm: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		description: new FormControl(''),
		telephone: new FormControl('', Validators.required)
	})

	ngOnInit() {
		this.store.select(store => store.authUserProfile)
			.subscribe(
					(res) => {
						this.userProfile = res.userProfile;
						
						if(!res.userProfile) {
							this.router.navigateByUrl('/create-profile')
						}
					},
					(err) => {
						console.warn("error", err)
					}, 
					() => {
						console.info("done")
					}
				)

		this.pForm.statusChanges.subscribe(res => {
			console.info("res", res)
			if(res == 'VALID') {
				this.profileChanged = false
			}
		})

		this.authService.onTokenChange()
		.subscribe(res => {
			this.store.dispatch(loggedInUserLoad({ userId: res.getPayload()['userId']  }))
			this.store.dispatch(userProfileLoad({ userId:  res.getPayload()['userId']}))
		})

		this.loadingUser = this.store.select(s => s.authUser.loading);
		this.loadingProfile = this.store.select(p => p.authUserProfile.loading);

		
			this.store.select(store => store.authUser)
			.subscribe(
				(res) => {
					this.currentUser = res.user
					if(!res.user) {
						this.router.navigate(['/'])
					}
					
				},
				(err) => {
					console.log("error", err)
				},
				() => {
					console.log("done")
				}
			)
		
			this.populateProfile()
			
	}



	
	// fileChanged(e) {
	// 	this.file = e.target.files[0];
	// }
	// uploadFile() {
	// 	this.fileStackService.upload(this.file)
	// 	.subscribe(res => console.log(res));
	// }



	updateProfile() {	
			this.userService.updateUserProfile(this.currentUser.id, this.pForm.value).subscribe(
				(changedData) => {
					this.toastrService.default("Profile updating", "Profile", { preventDuplicates: true, duration: 3000 })
				},
				(error) => {
					this.toastrService.danger("Profile not updated", "Profile")
				},
				() => {
					this.toastrService.success("Profile updated", "Profile")
				}
			)
		

	}

	populateProfile() {
		if(this.userProfile == null) {
			this.router.initialNavigation()
		} else {
			this.pForm.get('username').setValue(this.userProfile.username);
			this.pForm.get('description').setValue(this.userProfile.description)
			this.pForm.get('telephone').setValue(this.userProfile.telephone)
		}
	}
}
