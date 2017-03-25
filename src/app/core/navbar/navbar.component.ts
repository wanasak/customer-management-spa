import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';   // Subscription - Represent a disposable resource

import { AuthService } from '../services/auth.service';
import { GrowlerService, GrowlerMessageType } from '../growler/growler.service';

@Component({
    moduleId: module.id,
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isCollapsed: boolean;
    loginLogoutText = 'Login';
    sub: Subscription;

    constructor(
        private router: Router,
        private authService: AuthService,
        private growler: GrowlerService
    ) { }

    ngOnInit() {
        this.sub = this.authService.authChanged
            .subscribe((loggedIn: boolean) => {
                this.setLoginLogoutText();
            }, (err: any) => console.error(err));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loginOrLogout() {
        const isAuthenticated = this.authService.isAuthenticated;
        if (isAuthenticated) {
            this.authService.logout()
                .subscribe((status: boolean) => {
                    this.setLoginLogoutText();
                    this.growler.growl('Logged Out', GrowlerMessageType.Info);
                    this.router.navigate(['/customers']);
                }, (err: any) => console.error(err));
        }
        this.redirectToLogin();
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    setLoginLogoutText() {
        this.loginLogoutText = (this.authService.isAuthenticated) ? 'Logout' : 'Login';
    }

}
