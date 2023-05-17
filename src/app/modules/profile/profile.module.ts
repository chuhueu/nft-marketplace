import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogCreateNFTComponent } from './create-nft-dialog/create-nft-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        DialogCreateNFTComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        FuseCardModule,
        MatButtonModule,
        MatTooltipModule,
        SharedModule,
        MatIconModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class ProfileModule
{
}
