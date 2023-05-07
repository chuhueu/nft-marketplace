import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile.component';
const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule,
        FuseCardModule,
        MatButtonModule,
        MatTooltipModule,
        SharedModule,
        MatIconModule
    ]
})
export class ProfileModule
{
}
