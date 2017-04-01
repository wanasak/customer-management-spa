import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/services/auth.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated) {
            return true;
        }

        // Track url user is trying to go after loggin in
        this.authService.redirectToUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    }

}
