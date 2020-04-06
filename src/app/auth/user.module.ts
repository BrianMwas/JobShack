import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProfileRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';

import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FilestackModule } from '@filestack/angular';
import { ErrorsComponent } from "../shared/components/errors/errors.component"


import { 
    NbCardModule, 
    NbButtonModule, 
    NbInputModule, 
    NbActionsModule, 
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbStepperModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbBadgeModule,
    NbUserModule,
    NbDialogModule
 } from "@nebular/theme";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AfterFirstLoginComponent } from './after-first-login/after-first-login.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { QModalComponent } from './q-modal/q-modal.component';
import { StoreModule, StoreFeatureModule } from '@ngrx/store';
import * as fromApplications from "../auth/reducers/auth.reducer"
import { EffectsModule } from '@ngrx/effects';
import { ApplicationEffect } from './effects/application.effects';



@NgModule({
    declarations: [
        QModalComponent,
        ProfileComponent,
        CompanyComponent,
        DashboardComponent,
        AfterFirstLoginComponent,
        NewCompanyComponent,
        ErrorsComponent,
    ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        NbCardModule,
        NbActionsModule,
        NbInputModule,
        NbIconModule,
        NbSelectModule,
        NbButtonModule,
        NbListModule,
        NbStepperModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NbPopoverModule,
        NbCheckboxModule,
        NbDatepickerModule,
        NbBadgeModule,
        NbUserModule,
        FilestackModule,
        NbDialogModule.forRoot(),
        // StoreModule.forFeature(
        //     fromApplications.ApplicationsFeatureKey, fromApplications.applicationsReducer
        //     ),
        // EffectsModule.forFeature([ ApplicationEffect ])
        
    ],
    entryComponents: [
        QModalComponent
    ]
})
export class UserProfileModule {}  