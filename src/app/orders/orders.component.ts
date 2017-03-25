import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer, IPagedResult } from '../shared/interface';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    moduleId: module.id,
    selector: 'app-orders',
    templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit {

    customers: ICustomer[];
    totalRecords = 0;
    pageSize = 5;

    constructor(
        private dataService: DataService,
        private trackByService: TrackByService
    ) { }

    ngOnInit() {
        this.getCustomersPage(1);
    }

    pageChanged(page: number) {
        this.getCustomersPage(page);
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomerPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((res: IPagedResult<ICustomer[]>) => {
                this.totalRecords = res.totalRecords;
                this.customers = res.results;
            });
    }

}
