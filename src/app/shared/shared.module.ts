import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';
import { PaginationModule } from './pagination/pagination.module';

import { TrimPipe } from './pipes/trim.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

import { SortByDirective } from './directives/sortby.directive';

@NgModule({
    imports: [CommonModule, FilterTextboxModule, PaginationModule],
    exports: [CommonModule, TrimPipe, CapitalizePipe, SortByDirective, FilterTextboxModule, PaginationModule],
    declarations: [TrimPipe, CapitalizePipe, SortByDirective]
})
export class SharedModule { }
