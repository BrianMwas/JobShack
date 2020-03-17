import { Injectable } from "@angular/core";
import { NbAccessChecker } from '@nebular/security';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class ApplicationsGuard implements CanActivate {
    constructor(private accessChecker: NbAccessChecker, private router: Router) {}
    
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.accessChecker.isGranted('application-list', 'application-detail')) {
            return true
        } else {
            this.router.navigate(['/dashboard'])
            return false
        }
    }
}