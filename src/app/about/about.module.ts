import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';

@NgModule({
    imports: [AboutRoutingModule],
    exports: [AboutRoutingModule.components]
})
export class AboutMoudule { }