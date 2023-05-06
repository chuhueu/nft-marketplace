import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NFTDetailComponent } from './nft-detail.component';

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
        CommonModule
    ]
})
export class NFTDetailModule
{
}
