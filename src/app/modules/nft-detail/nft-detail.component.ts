import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import {catchError, of, Subject, takeUntil, } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-nft-detail',
    templateUrl: './nft-detail.component.html',
    styleUrls: ['./nft-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NFTDetailComponent implements OnInit, OnDestroy
{
    tokenAddressTemporary = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    dataList: any[] = [];
    destroy$ = new Subject<void>();
    selectedTokenAddress: string = '';
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef
    ){}

    ngOnInit(): void {
        // this.getNFTData();
        this.selectedTokenAddress = this._route.snapshot.paramMap.get('tokenAddress');
        console.log(this.selectedTokenAddress);
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
