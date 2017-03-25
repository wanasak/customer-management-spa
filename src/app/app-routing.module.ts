import { NgModule } from '@angular/core';
// PreloadAllModules - enable preloading of all lazy loading
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/customers' },
    { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
    { path: 'customers/:id', loadChildren: 'app/customer/customer.module#CustomerModule' },
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' }, // lazy loading route
    // Custom preloading strategy
    // { path: 'about', loadChildren: 'app/about/about.module#AboutModule', data: { preload: true } }
    { path: '**', pathMatch: 'full', redirectTo: '/customers' } // catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
