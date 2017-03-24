import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { ValidationService } from '../core/services/validation.service';
import { IUserLogin } from '../shared/interface';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private growler: GrowlerService
    ) { }

    ngOnInit() {
        this.buildForm();
     }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, ValidationService.emailValidator]],
            password: ['', [Validators.required, ValidationService.passwordValidator]]
        });
    }

    submit({ value, valid }: { value: IUserLogin, valid: boolean}) {
        this.authService.login(value)
            .subscribe((status: boolean) => {
                if (status) {
                    this.growler.growl('Logged in', GrowlerMessageType.Info);
                    if (this.authService.redirectToUrl) {
                        const redirectUrl = this.authService.redirectToUrl;
                        this.authService.redirectToUrl = '';
                        this.router.navigate([redirectUrl]);
                    } else {
                        this.router.navigate(['./customers']);
                    }
                } else {
                    const error = 'Unable to login';
                    this.errorMessage = error;
                    this.growler.growl(error, GrowlerMessageType.Danger);
                }
            });
    }

}
