import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { ICustomer, IState } from '../shared/interface';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';

@Component({
    moduleId: module.id,
    selector: 'app-customer-edit',
    templateUrl: 'customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {

    customer: ICustomer =
    {
        id: 0,
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        city: '',
        state: {
            abbreviation: '',
            name: ''
        },
        stateId: 1
    };
    states: IState[];
    errorMessage: string;
    deleteMessageEnabled: boolean;
    operationText = 'Insert';
    @ViewChild('customerForm') customerForm: NgForm;

    constructor(
        private dataService: DataService,
        private modalService: ModalService,
        private growler: GrowlerService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.parent.params.subscribe((params: Params) => {
            let id = +params['id'];
            if (id !== 0) {
                this.operationText = 'Update';
                this.getCustomer(id);
            }
        });
        this.dataService.getStates()
            .subscribe((states: IState[]) => {
                this.states = states;
            });
    }

    getCustomer(id: number) {
        this.dataService.getCustomer(id)
            .subscribe((customer: ICustomer) => {
                this.customer = customer;
            });
    }

    submit() {
        if (this.customer.id === 0) {
            this.dataService.insertCustomer(this.customer)
                .subscribe(() => {
                    // Mark form as markAsPristine
                    this.customerForm.form.markAsPristine();
                    this.router.navigate(['/customers']);
                }, err => {
                    const msg = 'Unable to insert customer';
                    this.growler.growl(msg, GrowlerMessageType.Danger);
                    this.errorMessage = msg;
                });
        } else {
            this.dataService.updateCustomer(this.customer)
                .subscribe(() => {
                    // Mark form as markAsPristine
                    this.customerForm.form.markAsPristine();
                    this.growler.growl('Updated customer successfully', GrowlerMessageType.Success);
                }, err => {
                    const msg = 'Unable to update customer';
                    this.growler.growl(msg, GrowlerMessageType.Danger);
                    this.errorMessage = msg;
                });
        }
    }

    cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/customers']);
    }

    delete(event: Event) {
        event.preventDefault();
        this.dataService.deleteCustomer(this.customer.id)
            .subscribe(() => {
                this.router.navigate(['/customers']);
            }, err => this.errorMessage = 'Unable to delete this customer');
    }

    canDeactive(): Promise<boolean> | boolean {
        if (!this.customerForm.dirty) {
            return true;
        }
        // Display dialog to user to confirm leaving
        const modalContent: IModalContent = {
            header: 'Lose unsaved change?',
            body: 'You have unsaved changes! Would you like to leave the page and lose them?',
            cancelButtonText: 'Cancel',
            OKButtonText: 'Leave'
        };
        return this.modalService.show(modalContent);
    }

}
