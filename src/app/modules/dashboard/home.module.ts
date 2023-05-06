import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        CommonModule
    ]
})
export class HomeModule
{
}
