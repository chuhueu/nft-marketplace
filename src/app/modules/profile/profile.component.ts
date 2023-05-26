import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { NFTService } from 'app/services/nft.service';
import {Subject, takeUntil, switchMap, catchError, of} from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DialogCreateNFTComponent } from './create-nft-dialog/create-nft-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    matDialogConfig: MatDialogConfig = {
        width: '70vw',
        panelClass: 'custom-mat-dialog',
        disableClose: true,
        autoFocus: false
    };

    destroy$ = new Subject<any>();
    profileData = JSON.parse(JSON.parse(localStorage.getItem('wagmi.store')));
    transactions: any = [];
    nfts: any = [];
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _nftService: NFTService,
        public _dialog: MatDialog,
        private _route: ActivatedRoute
    ) {}

    // Life cycle

    ngOnInit(): void {
        this.getNftByWallet();
    }

    showCreateNFT(): void {
        this._dialog.open(DialogCreateNFTComponent, {
            ...this.matDialogConfig,
            data: this.profileData.state.data.account
        }).afterClosed().subscribe((result) => {
            console.log(result);
        });
    }

    getNftByWallet(): void {
        if (!this.profileData.state.data) {
            return;
        }
        const { account, chain } = this.profileData.state.data;
        console.log(account);
        let chainId = null;
        if (chain) {
            chainId = chain.id === 11155111 && chain.unsupported ? '0xaa36a7' : '0x' + chain.id;
        }
        this._nftService.getNFTByWallet('0xd8da6bf26964af9d7eed9e03e53415d37aa96045', chainId) // TODO: change for later
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                if (!data) {
                    return;
                }
                this.nfts = data.result.map((item) => {
                    if (item.metadata) {
                        return {
                            ...item,
                            metadata: JSON.parse(item.metadata)
                        };
                    }
                })
                .slice(0, 50)
                .filter(f => f);
            });
    }

    getTransactionByWallet(): void {
        if (!this.profileData.state.data) {
            return;
        }
        const { account, chain } = this.profileData.state.data;
        const chainId = chain.id === 11155111 && chain.unsupported ? '0xaa36a7' : '0x' + chain.id;
        this._nftService.getTransactionByWallet(account, chainId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.transactions = data.result;
                console.log(this.transactions);
            });
    }

    selectedTableChange(event: MatTabChangeEvent): void {
        console.log(event);
        switch(event.index) {
            case 0: {
                this.getNftByWallet();
                break;
            }
            case 1: {
                this.getTransactionByWallet();
                break;
            }
            case 2: {
                break;
            }
        }
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

    handleImageError(tokenId: string): void {
        const image = document.getElementById(tokenId) as HTMLImageElement;
        image.src = 'https://testnets.opensea.io/static/images/placeholder.png';
    }

    trackByFn(index: number, item: any): any
    {
        return item.token_id || index;
    }

    ngOnDestroy(): void {
        this.destroy$.next(1);
        this.destroy$.complete();
    }

}
