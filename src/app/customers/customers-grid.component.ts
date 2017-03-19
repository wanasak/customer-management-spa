import { Component, OnInit, Input } from '@angular/core';

import { SorterService } from '../core/services/sorter.service';
import { TrackByService } from '../core/services/trackby.service';
import { ICustomer } from '../shared/interface';

@Component({
    moduleId: module.id,
    selector: 'app-customers-grid',
    templateUrl: 'customers-grid.component.html',
    styleUrls: ['customers-grid.component.css']
})
export class CustomerGridComponent implements OnInit {

    @Input() customers: ICustomer[] = [];

    constructor(
        private sorterService: SorterService,
        public trackbyService: TrackByService
    ) { }

    ngOnInit() { }

    sort(prop: string) {
        this.sorterService.sort(this.customers, prop);
    }

}
