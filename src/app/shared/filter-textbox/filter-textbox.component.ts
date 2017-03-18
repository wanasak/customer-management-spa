import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-filter-textbox',
    templateUrl: 'filter-textbox.component.html'
})
export class FilterTextboxComponent {

    model: { filter: string } = { filter: null };

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

    filterChanged(event: any) {
        event.preventDefault();
        this.changed.emit(this.model.filter);   // Raise changed event
    }

}
