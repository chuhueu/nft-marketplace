import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import {catchError, of, Subject, takeUntil, } from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy
{
    tokenAddressTemporary = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    dataList: any[] = [];
    destroy$ = new Subject<void>();
    constructor(
        private _router: Router,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef
    ){}

    ngOnInit(): void {
        this.getNFTData();
    }

    getNFTData(): void {
        this._ntfService.searchNFTs()
            .pipe(
                catchError(() => of([])),
                takeUntil(this.destroy$)
            )
            .subscribe((data) => {
                this.dataList = data.result.map((item) => {
                    if (item.metadata) {
                        return {
                            ...item,
                            metadata: JSON.parse(item.metadata)
                        };
                    }
                });
                this._changeDetectorRef.markForCheck();
            });
    }

    getImageFromMetaData(imgUrl: string): string {
        if (!imgUrl || imgUrl && !imgUrl.includes('ipfs://')) {
            return imgUrl;
        }
        const image = imgUrl.split('ipfs://')[1];
        return `https://ipfs.io/ipfs/${image}`;
    }

    getFakePrice(price: string): number {
        return parseFloat(price)/100;
    }

    viewDetailNFT(tokenAddress: string): void {
        void this._router.navigate([`/nft/view/${tokenAddress}`]);
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
