import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


import { NbAuthService, NbAuthJWTToken } from "@nebular/auth";
import { NbRoleProvider } from "@nebular/security";
import { UserService } from './user.service';

@Injectable()
export class RoleProvider implements NbRoleProvider {
  constructor (private authService: NbAuthService, private userService: UserService) {}

  getRole (): Observable<string> {
    return this.authService.onTokenChange()
          .pipe(
            map((token: NbAuthJWTToken) => {
              // return token.isValid() ? token.getPayload()['role']: 'seeker';
              let role: string;
              this.userService.getUserProfile(token.getPayload()['userId'])
              .subscribe(res => {
                role = res['data']['role']
              })

              return role
            })
          )
  }
}
