import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../core/services/data.service';
import { ICustomer, IOrder } from '../shared/interface';

@Component({
    moduleId: module.id,
    selector: 'app-customer-orders',
    templateUrl: 'customer-orders.component.html'
})
export class CustomerOrdersComponent implements OnInit {

    orders: IOrder[] = [];
    customer: ICustomer;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            let id = +params['id'];
            this.dataService.getCustomer(id)
                .subscribe((customer: ICustomer) => {
                    this.customer = customer;
                });
        });
    }

    ordersTrackBy(index: number, orderItem: any) {
        return index;
    }

}
