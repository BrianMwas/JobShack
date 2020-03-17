import { Injectable } from '@angular/core';
import { Qualification } from "../shared/models/qualification"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

interface Response {
  success: string,
  data: Qualification
}

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': 'token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

 private baseurl: string = environment.baseUrl

 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(JSON.stringify(error))
    this.log(`${operation} failed: ${JSON.stringify(error)}`)
    return of(result as T)
  }
}

private log(message: string) {
  console.log(message)
}

  constructor(private httpService: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
    .subscribe(res => {
      httpOptions.headers = httpOptions.headers.set("authorization", res['token'])
    })
   }

  getUserQualifications(userId) {
    let url = `${this.baseurl}user/${userId}/qualifications`;

    return this.httpService.get<Response>(url, httpOptions).pipe(
      catchError(
        this.handleError('getUserQualification')
      )
    )
  }

  postNewQualification(userId, qualification) {
    let url = `${this.baseurl}user/${userId}/qualifications/new`;

    return this.httpService.post(url, qualification, httpOptions).pipe(
      catchError(
        this.handleError('post new qualification')
      )
    )
  }

  updateQualification(userId, qualificationId, data: Qualification) {
    let url = `${this.baseurl}user/${userId}/qualifications/${qualificationId}`;

    return this.httpService.patch<Response>(url, data, httpOptions).pipe(
      catchError(
        this.handleError('update qualification.')
      )
    )
  }
}
