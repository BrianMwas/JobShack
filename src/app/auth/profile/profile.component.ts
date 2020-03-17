
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../user.service";
import { Profile } from "../../shared/models/profile"
import { NbDateService, NbDialogService } from "@nebular/theme"
import { QModalComponent } from "../q-modal/q-modal.component"
import { Qualification } from "../../shared/models/qualification"
import { QualificationService } from '../qualification.service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AppState } from 'src/app/shared/models/states/app.state.model';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


	@Input()
	profile : Profile;

  	userData: User

	startMax: Date;
	startMin: Date;

	qualifications: Qualification[] = [];

  	constructor(
	  	protected qualificationService: QualificationService,
		protected dateService: NbDateService<Date>,
		protected dialogService: NbDialogService,
		protected userService: UserService,
		private router: Router,
		private store: Store<AppState>
  	) {
			this.startMin = this.dateService.addYear(this.dateService.today(), -20)
      		this.startMax = this.dateService.addDay(this.dateService.today(), 0)
    }
  ngOnInit() {
	  	this.qualificationService.getUserQualifications(this.profile.user).subscribe(
			  res => {
				 for (let index = 0; index < res['data'].length; index++) {
					 this.qualifications
					 .unshift(
						 new Qualification(
							 	res['data'][index]
							 )
						 );
				 }
			  }
      )
	this.store.select(s => s.authUser).subscribe(res => {
		this.userData = res.user
	})
  }




	updateQualification(i) {
		let qualification = this.findByIndex(i, this.qualifications);

		this.qualificationService.updateQualification(this.profile.user, qualification['_id'], qualification).subscribe(
			res => {
				console.log("update", res)
				this.qualifications.splice(i, 1, res['data'])
			}
		)
	}

	findByIndex(index, arr) {
		if(index > arr.length) {
			return arr[arr.length - 1]
		} else if(index < -1) {
			return arr[0]
		}

		for(let i = 0; i < arr.length; i++ ) {
			if(i == index) {
				return arr[i]
			}
		}
	}

	addQualification() {
		this.dialogService.open(QModalComponent)
		.onClose.subscribe(q => {
			// console.log("qualification", q)
			let newQ = new Qualification(q);

			// console.log("qualification", this.qualifications)
			// this.qualifications.push(newQ)

			this.qualificationService.postNewQualification(this.profile.user, newQ).subscribe(res => {
				console.log("posted", res)
				this.qualifications.push(res['data'])
			})
		})
	}

	removeQualification(i: number) {
		this.qualifications.splice(i, 1)
	}

	goHome() {
		this.router.navigate(['/'])
	}
}
