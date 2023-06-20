import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import {catchError, forkJoin, of, Subject, takeUntil, } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import moment from 'moment';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-table-transaction',
    templateUrl: './table-transaction.component.html',
    styleUrls: ['./table-transaction.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableTransactionComponent implements OnInit, OnDestroy
{
    @Input() dataTable: any[] = [];
    @Input() isSetMaxHeight: boolean = true;
    destroy$ = new Subject<void>();
    dataSource = new MatTableDataSource([]);
    tableColumn: string[] = ['transactionHash', 'block', 'dateTime', 'from', 'to', 'price'];

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef
    ){}

    ngOnInit(): void {
        this.initMatTableDataSource();
    }

    initMatTableDataSource(): void {
        if (!this.dataTable) {
          return;
        }
        this.dataTable = this.dataTable.sort((a, b) => {
            const dateA = moment(a.block_timestamp).toDate();
            const dateB = moment(b.block_timestamp).toDate();
            return dateB.getTime() - dateA.getTime();
        });
        this.dataSource = new MatTableDataSource(this.dataTable);
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 6) + '....' + value.substr(-6);
    }

    formatDate(date): string {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

    formatPrice(price: string): any {
        return parseFloat(price);
        // return new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        // }).format(parseFloat(price));
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.token_id || index;
    }

}
