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
    errorImageUrl = 'https://testnets.opensea.io/static/images/placeholder.png';
    isErrorImage = false;
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
        //https://testnets.opensea.io/static/images/placeholder.png
        // this.isErrorImage = true;
        // console.log(data);
    }

    getFakePrice(price: string): number {
        return parseFloat(price)/1000;
    }

    viewDetailNFT(nftData): void {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const {token_address, token_id} = nftData;
        void this._router.navigate([`/nft/view/${token_address}/${token_id}`]);
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 4) + '....' + value.substr(-4);
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
