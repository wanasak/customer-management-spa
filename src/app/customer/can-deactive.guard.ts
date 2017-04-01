import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CustomerEditComponent } from './customer-edit.component';

@Injectable()
export class CanDeactiveGuard implements CanDeactivate<CustomerEditComponent> {

    canDeactivate(
        component: CustomerEditComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactive();
    }

}
