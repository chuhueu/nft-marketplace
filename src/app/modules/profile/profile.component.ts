import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    AfterViewInit,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { NFTService } from 'app/services/nft.service';
import { Subject, takeUntil, switchMap, catchError, of } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DialogCreateNFTComponent } from './create-nft-dialog/create-nft-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
    contractAddress,
    contractAddressHieu2,
    contractMarketABI,
    contractMarketAddress,
} from '../../../../contract';
import { generateRandomString } from 'app/constant';
// eslint-disable-next-line @typescript-eslint/naming-convention
const Web3 = require('web3');
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    matDialogConfig: MatDialogConfig = {
        width: '70vw',
        panelClass: 'custom-mat-dialog',
        disableClose: true,
        autoFocus: false,
    };

    destroy$ = new Subject<any>();
    profileData = JSON.parse(JSON.parse(localStorage.getItem('wagmi.store')));
    fakeNfts = JSON.parse(localStorage.getItem('fakeNfts')) ?? [];
    soldNft = JSON.parse(localStorage.getItem('soldNft')) ?? null;
    transactions: any = [];
    nfts: any = [];
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _nftService: NFTService,
        public _dialog: MatDialog,
        public _toastrService: ToastrService,
        private _route: ActivatedRoute
    ) {}

    // Life cycle

    ngOnInit(): void {
        this.getNftByWallet();
    }

    showCreateNFT(): void {
        this._dialog
            .open(DialogCreateNFTComponent, {
                ...this.matDialogConfig,
                data: this.profileData.state.data.account,
            })
            .afterClosed()
            .subscribe((result) => {
                if (!result) {
                    return;
                }
                this._toastrService.success('Bạn đã tạo NFT thành công');
                // const {name, price, description, image, attributes} = result;
                const fakeNft = {
                    ...this.nfts[0],
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    token_address: generateRandomString(40),
                    metadata: result,
                };
                this.nfts.unshift(fakeNft);
                const fakeNftLocal = {
                    account: this.profileData.state.data.account,
                    data: fakeNft,
                };
                const fakeNftsLocal = {
                    account: this.profileData.state.data.account,
                    data: this.nfts,
                };
                localStorage.setItem('fakeNft', JSON.stringify(fakeNftLocal));
                localStorage.setItem('fakeNfts', JSON.stringify(fakeNftsLocal));
                setTimeout(() => {
                    this.getNftByWallet();
                }, 3000);
            });
    }

    getNftByWallet(): void {
        if (!this.profileData.state.data) {
            return;
        }
        const { account, chain } = this.profileData.state.data;
        let chainId = null;
        if (chain) {
            chainId =
                chain.id === 11155111 && chain.unsupported
                    ? '0xaa36a7'
                    : '0x' + chain.id;
        }
        this._nftService
            .getNFTByWallet(account, chainId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                if (!data) {
                    return;
                }
                this.nfts = data.result
                    .map((item) => {
                        if (item.metadata) {
                            return {
                                ...item,
                                metadata: JSON.parse(item.metadata),
                            };
                        }
                    })
                    .slice(0, 50)
                    .filter((f: any) => f);
                if (
                    this.fakeNfts === account &&
                    this.fakeNfts.data.length > 0
                ) {
                    this.nfts = this.fakeNfts;
                }
                if (this.soldNft) {
                    this.nfts = this.nfts.filter(
                        (nft: any) =>
                            nft.token_address !== this.soldNft.token_address
                    );
                }
            });
    }

    getTransactionByWallet(): void {
        if (!this.profileData.state.data) {
            return;
        }
        const { account, chain } = this.profileData.state.data;
        const chainId =
            chain.id === 11155111 && chain.unsupported
                ? '0xaa36a7'
                : '0x' + chain.id;
        this._nftService
            .getTransactionByWallet(account, chainId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
                this.transactions = data.result;
            });
    }

    selectedTableChange(event: MatTabChangeEvent): void {
        switch (event.index) {
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
        const { token_id } = nftData;
        const { account, chain } = this.profileData.state.data;
        if (account === '0xe6A998e4dfe706b83E5810D152556C39AF7a7a17') {
            void this._router.navigate([
                `/nft/view/${contractAddress}/${token_id}`,
            ]);
            return;
        }
        void this._router.navigate([
            `/nft/view/${contractAddressHieu2}/${token_id}`,
        ]);
        // const web3 = new Web3(window.ethereum);x`
        // const contract = new web3.eth.Contract(
        //     contractMarketABI,
        //     contractMarketAddress
        // );
        // contract.methods
        //     .createMarketItem(contractAddress, token_id, 250)
        //     .call({ from: this.profileData.state.data.account })
        //     .then((result) => {
        //         console.log('NFT created:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        // void this._router.navigate([`/nft/view/${token_address}/${token_id}`]);
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 4) + '....' + value.substr(-4);
    }

    getImageFromMetaData(imgUrl: string): string {
        if (!imgUrl || (imgUrl && !imgUrl.includes('ipfs://'))) {
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

    trackByFn(index: number, item: any): any {
        return item.token_id || index;
    }

    ngOnDestroy(): void {
        this.destroy$.next(1);
        this.destroy$.complete();
    }
}
