import { NbAuthService } from '@nebular/auth';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { User } from '../shared/models/user';
import { environment } from 'src/environments/environment';
import { Profile } from '../shared/models/profile';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'authorization': 'token'
  })
}

interface UserResult {
  data: User
  success: boolean
}

interface IProfileResult {
  data: Profile,
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl
  token: any;
  private authUser = new Subject<User>();

  

  constructor(private http: HttpClient, private authService: NbAuthService) { 
    this.authService.getToken()
      .subscribe(res => {
        httpOptions.headers = httpOptions.headers.set("authorization", res['token'])
      })
   }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${JSON.stringify(error)}`)
      return of(result as T)
    }
  }

  private log(message: string) {
    console.log(message)
  }


  getUserProfile(userId) {
  	let url = `${this.baseUrl}user/${userId}/profile`;
  	return this.http.get<IProfileResult>(url, httpOptions);
  }

  getUserDetail() {
    return this.authUser
  }
    

  getAuthUser(userId) {
    let url = `${this.baseUrl}users/${userId}`;

    return this.http.get<UserResult>(url, httpOptions)
  }

  addUserProfile(userId, profile) {
    let url = `${this.baseUrl}user/new/${userId}/create-profile`;

    console.log("url", url)

    console.log("profile", profile)
    return this.http.post(url, profile, httpOptions)
    // return this.http.post(url, profile, httpOptions)
    .pipe(
        map(res => { 
          console.log("res", res)
          return res['data']
        }),
        catchError(
          this.handleError('postProfile'))
      )
  }

  updateUserProfile(userId, data) {
    let url = `${this.baseUrl}user/${userId}/update-profile`;

    return this.http.patch(url, data, httpOptions).pipe(
      map(data => data['data']),
      catchError(this.handleError('profile update failed'))
    )
  }
}
