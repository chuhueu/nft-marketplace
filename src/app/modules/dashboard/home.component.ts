import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import {catchError, of, Subject, takeUntil, } from 'rxjs';
import {Router} from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SearchService } from 'app/layout/common/search/search.service';

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
    initDataList: any[] = [];
    destroy$ = new Subject<void>();
    isErrorImage = false;
    tabs = ['All', 'Art', 'Gaming', 'Photography'];
    constructor(
        private _router: Router,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _searchService: SearchService
    ){}

    ngOnInit(): void {
        this.getNFTData('des', 'description');
        this._searchService.getSearchValue().subscribe((value) => {
            this.filterBySearchTerm(value);
        });
    }

    getNFTData(searchTerm: string = 'art', filterByField: string = 'name'): void {
        this._ntfService.searchNFTs(searchTerm, filterByField)
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
                }).slice(0, 50);
                this.initDataList = JSON.parse(JSON.stringify(this.dataList));
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

    selectedTableChange(event: MatTabChangeEvent): void {
        if (event.tab.textLabel === 'All') {
            this.getNFTData('des', 'description');
            return;
        }
        this.getNFTData(event.tab.textLabel.toLowerCase());
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    trackByFn(index: number, item: any): any
    {
        return item.token_id || index;
    }

    filterBySearchTerm(searchValue: string): void {
        const searchTerm = searchValue.toLowerCase().replace(' ', '');
        if (searchTerm === '') {
          this.dataList = this.initDataList;
          return;
        }
        this.dataList = this.initDataList.filter((data) => {
          const {description, name} = data.metadata;
          return this.emptyOrNothing(description).toLowerCase().includes(searchTerm)
            || this.emptyOrNothing(name).toLowerCase().includes(searchTerm)
            || this.emptyOrNothing(data.token_address).toLowerCase().includes(searchTerm);
        });
    }

    emptyOrNothing(value: string): string {
        if (value === undefined || value === null || !value) {
          return '';
        }

        return value;
    }

}
