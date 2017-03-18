import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrimPipe } from './pipes/trim.pipe';

@NgModule({
    imports: [CommonModule],
    exports: [CommonModule, TrimPipe],
    declarations: [TrimPipe]
})
export class SharedModule { }
