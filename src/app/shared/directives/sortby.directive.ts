import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appSortBy]'
})
export class SortByDirective {

    private sortedProperty: string;

    @Output() sorted: EventEmitter<string> = new EventEmitter<string>();
    @Input('appSortBy') set sortBy(value: string) {
        this.sortedProperty = value;
    }
    @HostListener('click', ['$event']) onclick($event) {
        event.preventDefault();
        this.sorted.emit(this.sortedProperty);  // Raise clicked event
    }

    constructor() { }

}
