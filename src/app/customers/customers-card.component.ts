import { Component, OnInit, Input } from '@angular/core';

import { ICustomer } from '../shared/interface';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    moduleId: module.id,
    selector: 'app-customers-card',
    templateUrl: 'customers-card.component.html',
    styleUrls: ['customers-card.component.css']
})
export class CustomersCardComponent implements OnInit {

    @Input() customers: ICustomer[] = [];

    constructor(public trackbyService: TrackByService) { }

    ngOnInit() { }

}

