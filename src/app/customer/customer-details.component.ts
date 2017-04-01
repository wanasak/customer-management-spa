import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ICustomer } from '../shared/interface';
import { DataService } from '../core/services/data.service';

@Component({
    moduleId: module.id,
    selector: 'app-customer-details',
    templateUrl: 'customer-details.component.html',
    styles: [`
        .details-image {
            height:100px;width:100px;margin-top:10px;
        }
    `]
})
export class CustomerDetailsComponent implements OnInit {

    customer: ICustomer;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit() {
        // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
        this.route.parent.params.subscribe((params: Params) => {
            let id = +params['id'];
            this.dataService.getCustomer(id)
                .subscribe((customer: ICustomer) => {
                    this.customer = customer;
                });
        });
    }

}
