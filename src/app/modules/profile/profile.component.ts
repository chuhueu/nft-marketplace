import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { NFTService } from 'app/services/nft.service';
import {Subject, takeUntil, switchMap, catchError, of} from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<any>();
  profileData = JSON.parse(JSON.parse(localStorage.getItem('wagmi.store')));
  transactions: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _nftService: NFTService
  ) {}

  // Life cycle

  ngOnInit(): void {
    console.log(this.profileData);
    this.getNftByWallet();
  }

  getNftByWallet(): void {
    if (!this.profileData.state.data) {
        return;
    }
    const { account, chain } = this.profileData.state.data;
    const chainId = chain.id === 11155111 && chain.unsupported ? '0xaa36a7' : '0x' + chain.id;
    this._nftService.getNFTByWallet(account, chainId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
            console.log(data);
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

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }

}
