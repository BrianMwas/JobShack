
import { Job } from '../shared/models/job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, map, tap, shareReplay, retryWhen, delay } from 'rxjs/operators';
import { NbAuthService } from '@nebular/auth';
import { environment } from 'src/environments/environment';


interface JobResults {
  data: Job[],
  success: boolean
}

interface SingleJobResult {
  data: Job,
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
export class JobService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.getToken()
    .subscribe(res=> {
      httpOptions.headers = httpOptions.headers.set('authorization', res['token'])
    })
   }

  getJobById(id: String) {
    let jobUrl = `${this.baseUrl}jobs/${id}`;
    return this.http.get<SingleJobResult>(jobUrl);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error}`)
      return of(result as T)
    }
  }


  private log(message: string) {
    console.log(message)
  }

  getJobs() {
    let jobsUrl = `${this.baseUrl}jobs`;
    return this.http.get<JobResults>(jobsUrl)
  }


  getJobsByCategory(q): Observable<any> {
    let url = `${this.baseUrl}category?${q}`;
    console.log("url", url)
    return this.http.get<JobResults>(url).pipe(
      tap(res => console.info("res", res)),
      map(res => res.data),
      catchError(this.handleError('job category'))
    )
  }


  search(query: string): Observable<Job[]> {
    let searchString = `${this.baseUrl}search=${query}`;
    return this.http.get<Job[]>(searchString)
  }


  postJob(companyId: string, job: Job): Observable<Job> {
    let url = `${this.baseUrl}company/${companyId}/new-job`
    return this.http.post<Job>(url, job, httpOptions).pipe(
      catchError(this.handleError('addJob', job))
    )
  }

  updateJob(companyId: string, jobId: string, job: Job) {
    let url = `${this.baseUrl}companies/${companyId}/jobs/${jobId}/update`;
    return this.http.put(url, job, httpOptions)
  }
}
