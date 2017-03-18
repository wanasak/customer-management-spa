import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrimPipe } from './pipes/trim.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

import { SortByDirective } from './directives/sortby.directive';

@NgModule({
    imports: [CommonModule],
    exports: [CommonModule, TrimPipe, CapitalizePipe, SortByDirective],
    declarations: [TrimPipe, CapitalizePipe, SortByDirective]
})
export class SharedModule { }
