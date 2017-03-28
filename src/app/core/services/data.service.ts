import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ICustomer, IOrder, IPagedResult, IState } from '../../shared/interface';

@Injectable()
export class DataService {

    customerBaseUrl = 'http://localhost:50972/api/customers';
    orderBaseUrl = 'api/orders';
    customers: ICustomer[];
    orders: IOrder[];

    constructor(private http: Http) { }

    getCustomerPage(page: number, pageSize: number): Observable<IPagedResult<ICustomer[]>> {
        return this.http.get(`${this.customerBaseUrl}/page/${page}/${pageSize}`)
            .map((res: Response) => {
                const totalRecords = +res.headers.get('TotalItemsCount');
                let customers = res.json();
                this.calculateCustomerOrderTotal(customers);
                return {
                    results: customers,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }

    getCustomers(): Observable<ICustomer[]> {
        return this.http.get(this.customerBaseUrl)
            .map((res: Response) => {
                let customers = res.json();
                this.calculateCustomerOrderTotal(customers);
                return customers;
            })
            .catch(this.handleError);
    }

    getCustomer(id: number): Observable<ICustomer> {
        return this.http.get(this.customerBaseUrl + '/' + id)
            .map((res: Response) => {
                let customer = res.json();
                this.calculateCustomerOrderTotal([customer]);
                return customer;
            })
            .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.post(this.customerBaseUrl, customer)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.put(this.customerBaseUrl + '/' + customer.id, customer)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteCustomer(id: number): Observable<boolean> {
        return this.http.delete(this.customerBaseUrl + '/' + id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    getStates(): Observable<IState[]> {
        return this.http.get('/api/states')
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    calculateCustomerOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (const order of customer.orders) {
                    total += order.itemCost;
                }
                customer.orderTotal = total;
            }
        }
    }

    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }

    // Show how to create and work with custom observable
    createObservable(data: any): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }

}
