import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
    imports: [SharedModule, CustomerRoutingModule],
    declarations: [CustomerRoutingModule.components]
})
export class CustomerModule { }
