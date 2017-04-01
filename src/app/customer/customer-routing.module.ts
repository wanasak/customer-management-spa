import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerOrdersComponent } from './customer-orders.component';
import { CanActivateGuard } from './can-activate.guard';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
            { path: 'orders', component: CustomerOrdersComponent },
            { path: 'details', component: CustomerDetailsComponent },
            {
                path: 'edit',
                component: CustomerEditComponent,
                canActivate: [CanActivateGuard],
                canDeactivate: []
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CanActivateGuard]
})
export class CustomerRoutingModule {
    static components = [CustomerComponent, CustomerEditComponent, CustomerDetailsComponent, CustomerOrdersComponent];
}


