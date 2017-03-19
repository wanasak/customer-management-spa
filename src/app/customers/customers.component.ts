import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer, IPagedResult } from '../shared/interface';
import { FilterService } from '../core/services/filter.service';

@Component({
    moduleId: module.id,
    selector: 'app-customers',
    templateUrl: 'customers.component.html'
})
export class CustomersComponent implements OnInit {

    title: string;
    filterText: string;
    customers: ICustomer[] = [];
    filteredCustomers: ICustomer[] = [];
    displayMode: DisplayModeEnum;
    displayModeEnum: DisplayModeEnum;
    totalRecords = 0;
    pageSize = 10;

    constructor(
        private dataService: DataService,
        private filterService: FilterService
    ) { }

    ngOnInit() {
        this.title = 'Customers';
        this.filterText = 'Filter Customers';
        this.displayMode = DisplayModeEnum.Card;
        this.getCustomersPage(1);
    }

    changeDisplayMode(mode: DisplayModeEnum) {
        this.displayMode = mode;
    }

    pageChanged(page: number) {
        this.getCustomersPage(page);
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomerPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((res: IPagedResult<ICustomer[]>) => {
                this.customers = this.filteredCustomers = res.results;
                this.totalRecords = res.totalRecords;
            }, (err: any) => {
                console.error('getCustomersPage() retrived customers for page: ' + page);
            });
    }

    filterChanged(filter: string) {
        if (filter && this.customers) {
            filter = filter.toUpperCase();
            // defined properties which we want to search
            const props = ['firstName', 'lastName', 'city', 'state.name'];
            this.filteredCustomers = this.filterService.filter<ICustomer>(this.customers, filter, props);
        } else {
            this.filteredCustomers = this.customers;
        }
    }   

}

enum DisplayModeEnum {
    Card = 0,
    Grid = 1
}

