import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { readContract } from '@wagmi/core';
import { contractABI, contractAddress } from '../../../../../contract';
// eslint-disable-next-line @typescript-eslint/naming-convention
const Web3 = require('web3');
@Component({
    selector: 'app-create-nft-dialog',
    templateUrl: './create-nft-dialog.component.html',
    styleUrls: ['./create-nft-dialog.component.scss'],
})
export class DialogCreateNFTComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<void>();
    form: FormGroup;
    addUser: string;
    fileUpload: File;
    uploadedImageUrl: string | ArrayBuffer;
    noImage = 'https://testnets.opensea.io/static/images/placeholder.png';
    constructor(
        public dialogRef: MatDialogRef<DialogCreateNFTComponent>,
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.initFormGroup();
        // this.getNft();
    }

    initFormGroup(): void {
        this.form = this._formBuilder.group({
            price: [null, Validators.required],
            name: [null, Validators.required],
            fileUpload: [null],
            description: [null],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getNft(): void {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        contract.methods
            .getNFT(2)
            .call({ from: this.data })
            .then((result) => {
                console.log('NFT created:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    submitForm(): void {
        if (typeof window.ethereum === 'undefined' || this.form.invalid) {
            return;
        }
        const imageTest =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png';
        const { name, price, description, fileUpload } = this.form.value;
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        contract.methods
            .name()
            .call({ from: this.data })
            .then((result: any) => console.log(result));
        // contract.methods
        //     .mintNFT('0xe6A998e4dfe706b83E5810D152556C39AF7a7a17', )
        //     .send({from: this.data})
        //     .then((result) => {
        //         console.log('NFT created:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }

    onCancelForm(itemRef: any): void {
        this.dialogRef.close(itemRef);
    }

    onFileChange(event: Event): void {
        const reader = new FileReader();
        const target = event.target as HTMLInputElement;
        const file: File = target.files[0];
        if (target.files && file) {
            this.fileUpload = file;
            reader.readAsDataURL(file);
            reader.onload = (): void => {
                this.uploadedImageUrl = reader.result;
            };
        }
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 4) + '....' + value.substr(-4);
    }
}
