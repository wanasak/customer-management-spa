import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const app_routes: Routes = [
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' } // lazy loading route
];

@NgModule({
    imports: [RouterModule.forRoot(app_routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
