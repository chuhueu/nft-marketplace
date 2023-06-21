import {
    Component,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { NFTService } from 'app/services/nft.service';
import { catchError, forkJoin, of, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { getAccount } from '@wagmi/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWarningComponent } from 'app/shared/dialog-warning/dialog-warning.component';
import { oneEth } from 'app/constant';
import { FuseLoadingService } from '@fuse/services/loading';
import {
    contractABI,
    contractAddress,
    contractAddressHieu2,
    contractHieu2ABI,
} from '../../../../contract';
// eslint-disable-next-line @typescript-eslint/naming-convention
const Web3 = require('web3');
@Component({
    selector: 'app-nft-detail',
    templateUrl: './nft-detail.component.html',
    styleUrls: ['./nft-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NFTDetailComponent implements OnInit, OnDestroy {
    nftDetail: any = null;
    fakeNftDetail = JSON.parse(localStorage.getItem('fakeNft')) ?? '';
    profileData =
        JSON.parse(JSON.parse(localStorage.getItem('wagmi.store'))) ?? '';
    nftHistoryTransactions: any[] = [];
    destroy$ = new Subject<void>();
    selectedTokenAddress: string = '';
    selectedTokenId: string = '';
    priceEthDefault: number = 1901.84;
    priceEth: number = 0;
    isLoggedIn = false;
    isSubmitting = false;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ntfService: NFTService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _toastrService: ToastrService,
        public dialog: MatDialog,
        private _fuseLoadingService: FuseLoadingService
    ) {}

    ngOnInit(): void {
        this.selectedTokenAddress =
            this._route.snapshot.paramMap.get('tokenAddress');
        this.selectedTokenId = this._route.snapshot.paramMap.get('tokenId');
        this.getNFTDetail();
        // this.getHistoryTransactions();
        const { isConnected } = getAccount();
        this.isLoggedIn = isConnected;
    }

    getNFTDetail(): void {
        if (this.selectedTokenAddress === this.fakeNftDetail.token_address) {
            this.nftDetail = this.fakeNftDetail;
            this.priceEth = this.fakeNftDetail.metadata.price ?? 0.001;
            return;
        }
        let chainId = null;
        if (this.profileData.state.data && this.profileData.state.data.chain) {
            const { chain } = this.profileData.state.data;
            chainId =
                chain.id === 11155111 && chain.unsupported
                    ? '0xaa36a7'
                    : '0x' + chain.id;
        }
        const getNftDetail$ = this._ntfService.getNFTOwners(
            this.selectedTokenAddress,
            this.selectedTokenId,
            chainId ? chainId : '0x1'
        );
        const getNFTHistoryTransactions$ = this._ntfService.getNFTTrades(
            this.selectedTokenAddress
        );

        forkJoin([getNftDetail$, getNFTHistoryTransactions$])
            .pipe(
                catchError(() => of([])),
                takeUntil(this.destroy$)
            )
            .subscribe(([nftDetail, nftHistoryTransactions]) => {
                this.nftDetail = {
                    ...nftDetail.result[0],
                    metadata: JSON.parse(nftDetail.result[0].metadata),
                };
                this.nftHistoryTransactions = nftHistoryTransactions.result;
                this.priceEth =
                    parseFloat(this.nftHistoryTransactions[0].price) / oneEth ??
                    0.001;
                this._changeDetectorRef.markForCheck();
            });
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

    handleImageError(): void {}

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
        return parseFloat(price) / oneEth;
    }

    formatPrice(price: string): any {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(price));
    }

    buyNFT(data: any): void {
        if (!this.isLoggedIn) {
            this._toastrService.warning(
                'Bạn phải kết nối tới ví điện tử thì mới có thể thực hiện giao dịch'
            );
            return;
        }
        if (typeof window.ethereum === 'undefined') {
            this._toastrService.warning('Đã có lỗi xảy ra');
            return;
        }
        this.isSubmitting = true;
        this._fuseLoadingService.show();
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
            contractHieu2ABI,
            contractAddressHieu2
        );
        const { account } = this.profileData.state.data;
        contract.methods
            .mintNFT(account, data.token_uri)
            .send({ from: account })
            .then(() => {
                this.isSubmitting = false;
                this._fuseLoadingService.hide();
                this._toastrService.success(
                    `Bạn đã mua thành công NFT ${
                        data.metadata.name ?? data.name
                    }`
                );
            })
            .catch((error) => {
                this._fuseLoadingService.hide();
                console.error('Error:', error);
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(null);
        this.destroy$.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.token_id || index;
    }

    getFakeTokenUri(value: string | number): string {
        return `https://raw.githubusercontent.com/chuhueu/nft-marketplace/main/src/app/metadata/${value}.json`;
    }
}
