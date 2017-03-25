import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { GrowlerModule } from './growler/growler.module';
import { ModalModule } from './modal/modal.module';

/* Services */
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';
import { ValidationService } from './services/validation.service';

import { NavbarComponent } from './navbar/navbar.component';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';    // Prevent reimport of the CoreModule

@NgModule({
    imports: [CommonModule, GrowlerModule, ModalModule, RouterModule, HttpModule],
    exports: [GrowlerModule, ModalModule, NavbarComponent, RouterModule, HttpModule],
    declarations: [NavbarComponent],
    providers: [AuthService, DataService, FilterService, SorterService, TrackByService, ValidationService]    // This should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }

}

