import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import {catchError, forkJoin, of, Subject, takeUntil, } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import moment from 'moment';
@Component({
    selector: 'app-nft-detail',
    templateUrl: './nft-detail.component.html',
    styleUrls: ['./nft-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NFTDetailComponent implements OnInit, OnDestroy
{
    tokenAddressTemporary = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
    nftDetail: any = null;
    nftHistoryTransactions: any[] = [];
    destroy$ = new Subject<void>();
    selectedTokenAddress: string = '';
    selectedTokenId: string = '';
    priceEthDefault: number = 1901.84;
    priceEth: number = 0;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef
    ){}

    ngOnInit(): void {
        this.selectedTokenAddress = this._route.snapshot.paramMap.get('tokenAddress');
        this.selectedTokenId = this._route.snapshot.paramMap.get('tokenId');
        this.getNFTDetail();
        // this.getHistoryTransactions();
    }

    getNFTDetail(): void {
        const getNftDetail$ = this._ntfService.getNFTOwners(this.selectedTokenAddress, this.selectedTokenId);
        const getNFTHistoryTransactions$ = this._ntfService.getNFTTrades(this.selectedTokenAddress);

        forkJoin([
            getNftDetail$,
            getNFTHistoryTransactions$
        ])
            .pipe(
                catchError(() => of([])),
                takeUntil(this.destroy$)
            )
            .subscribe(([nftDetail, nftHistoryTransactions]) => {
                this.nftDetail = {
                    ...nftDetail.result[0],
                    metadata: JSON.parse(nftDetail.result[0].metadata)
                };
                this.nftHistoryTransactions = nftHistoryTransactions.result;
                this.priceEth = (parseFloat(this.nftHistoryTransactions[0].price)/100000000)/this.priceEthDefault;
                this._changeDetectorRef.markForCheck();
            });
    }

    getImageFromMetaData(imgUrl: string): string {
        if (!imgUrl || imgUrl && !imgUrl.includes('ipfs://')) {
            return imgUrl;
        }
        const image = imgUrl.split('ipfs://')[1];
        const imageUrl = `https://ipfs.io/ipfs/${image}`;
        const searchString = 'ipfs';
        const delimiter = '/';
        let count = 0;
        const newImageUrl = imageUrl
            .split(delimiter)
            .filter((item) => {
            if (item === searchString) {
                count++;
                return count <= 1;
            }
            return true;
            })
            .join(delimiter);

        return newImageUrl;
    }

    handleImageError(): void {
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 4) + '....' + value.substr(-4);
    }

    formatDate(date): string {
        return moment(date).format('DD-MM-YYYY');
    }

    formatPriceToETH(price: string): number {
        return parseFloat(price)/this.priceEthDefault;
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
