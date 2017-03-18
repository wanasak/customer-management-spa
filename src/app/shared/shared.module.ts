import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrimPipe } from './pipes/trim.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
    imports: [CommonModule],
    exports: [CommonModule, TrimPipe, CapitalizePipe],
    declarations: [TrimPipe, CapitalizePipe]
})
export class SharedModule { }
