import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NFTDetailComponent } from './nft-detail.component';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
const exampleRoutes: Route[] = [
    {
        path     : '',
        component: NFTDetailComponent
    }
];

@NgModule({
    declarations: [
        NFTDetailComponent
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
export class NFTDetailModule
{
}
