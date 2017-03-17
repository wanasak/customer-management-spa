import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrowlerModule } from './growler/growler.module';
import { ModalModule } from './modal/modal.module';

/* Services */
import { AuthService } from './services/auth.service';

import { NavbarComponent } from './navbar/navbar.component';

import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';    // Prevent reimport of the CoreModule

@NgModule({
    imports: [CommonModule, GrowlerModule, ModalModule],
    exports: [GrowlerModule, ModalModule, NavbarComponent],
    declarations: [NavbarComponent],
    providers: [AuthService]    // This should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }

}

