import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Company } from '../shared/models/company';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = environment.baseUrl


  private handleError<T>(operation = 'operation', result?: T, route: string = '/') {
    return (error: any): Observable<T> => {
      console.error(JSON.stringify(error))
      this.router.navigateByUrl(route);
      this.log(`${operation} failed: ${JSON.stringify(error)}`)
      return of(result as T)
    }
  }

  private log(message: string) {
    console.log(message)
  }


  constructor(private httpService: HttpClient, private authService: NbAuthService, private router: Router) {
    this.authService.getToken()
    .subscribe(res => {
      httpOptions.headers = httpOptions.headers.set("authorization", res['token'])
    })
   }


   create(data) {
     let url = `${this.baseUrl}company/new`;
     return this.httpService.post(url, data, httpOptions).pipe(
       catchError(
         this.handleError('postCompany')
       ),
       map(res => res['data'])
     )
   }

   getCompany() {
     let url = `${this.baseUrl}owner/company`;

     return this.httpService.get(url, httpOptions).pipe(
       tap(res => {
         console.log("data", res)
        }),
       map(res => res['data']),

       catchError(
         this.handleError('Owner company retrieve failed.', 'Error', '/create-company')
       )
     )
   }

   getCompanyById(id) {
    let url = `${this.baseUrl}company/${id}`;
    console.log("url", url)
    return this.httpService.get(url).pipe(
      catchError(
        this.handleError('getCompanyById')
      ),
      map(res => res['data'])
    )
   }

   getCompanyBySlug(slug) {
     let url = `${this.baseUrl}company/${slug}`;

     this.httpService.get(url, httpOptions).pipe(
       catchError(
         this.handleError('getCompanyBySlug')
       ),
       map(res => res['data'])
     )
   }

   updateCompany(id, data) {
     let url = `${this.baseUrl}company/${id}/update`;

     return this.httpService.put(url, data, httpOptions).pipe(
       catchError(
         this.handleError('updateCompany')
       ),
       map(res => res['data'])
     )
   }

   addCompanyMember(id, member) {
    let url = `${this.baseUrl}companies/${id}/members`;

    return this.httpService.post(url, member, httpOptions).pipe(
      catchError(
        this.handleError('AddMember')
      ),
      map(res => res['data'])
    )
   }
}
