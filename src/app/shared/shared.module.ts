import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TableTransactionComponent } from './table-transaction/table-transaction.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        TableTransactionComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatTooltipModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableTransactionComponent
    ]
})
export class SharedModule
{
}
