
import { Observable, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { CompanyService } from './company.service';
import { mergeMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../shared/models/states/app.state.model';



@Injectable({
  providedIn: 'root'
})
export class CompanyResolverService implements Resolve<any> {
  
  constructor(private store: Store<AppState>, private companySevice: CompanyService, private router: Router) { }
  company;
  resolve(): Observable<any> {
    this.store.select(store => store.authUserProfile.userProfile).subscribe(res => {
      console.log("res type", typeof res);
      console.log("company profile", res);
      
      if(!res) {
        this.router.navigateByUrl('/create-profile')
      }
      
      if(res.role == "employer") {
        this.company = true
      } else {
        this.company = false
      }
    })

    if(this.company) {
      return this.companySevice.getCompany().pipe(
        take(1),
        mergeMap(company => {
          if(company) {
            return of(company)
          } else {
            this.router.navigate(['/dashboard'])
            return EMPTY
          }
        })
      )
    } 
  }
}
