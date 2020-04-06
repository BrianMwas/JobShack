import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Application } from '../shared/models/application';

interface IResults {
  data: Application[],
  success: boolean
}

interface ISingleResults {
  payload: Application,
  success: boolean
}


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'token'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseURL: string = environment.baseUrl

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
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
      console.log("token", res)
    })
   }

  createApplication(jobId: String) {
    const url = `${this.baseURL}jobs/${jobId}/application/new`;


    return this.httpService.get(url, httpOptions).pipe(
      catchError(
        this.handleError("job application failed")
      )
    );
  }


  getApplicationDetail(applicationId: string) {
    const url = `${this.baseURL}jobs/applications/${applicationId}`;
    console.log("url", url);
    
    return this.httpService.get<ISingleResults>(url, httpOptions)
  }


  getAllJobApplications(jobId: String) {
    let url = `${this.baseURL}jobs/${jobId}/applications`;
    return this.httpService.get<IResults>(url, httpOptions)
  }


  updateJobApplication(slug: String, jobId:String, applicationId: String, data: Observable<any>) {
    let url = `${this.baseURL}jobs/${slug}/${jobId}/${applicationId}`;

    return this.httpService.put(url, data, httpOptions).pipe(
      catchError(
        this.handleError('updateApplication')
      ),
      map(res => res['data'])
    )
  }

  removeUserApplication(slug: String, jobId: String, applicationId: String) {
    let url = `${this.baseURL}jobs/${slug}/${jobId}/${applicationId}`;

    return this.httpService.get(url, httpOptions).pipe(
      catchError(
        this.handleError('deleteApplication')
      )
    )
  }
}
