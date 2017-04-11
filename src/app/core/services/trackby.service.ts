import { Injectable } from '@angular/core';

import { ICustomer, IOrder } from '../../shared/interface';

@Injectable()
export class TrackByService {

    customer(index: number, customer: ICustomer) {
        return customer.id;
    }

    order(index: number, order: IOrder) {
        return index;
    }

}