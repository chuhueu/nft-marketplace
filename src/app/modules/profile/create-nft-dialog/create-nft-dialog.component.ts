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
import { contractABI, contractAddress } from '../../../../../contract';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FuseLoadingService } from '@fuse/services/loading';
// eslint-disable-next-line @typescript-eslint/naming-convention
const Web3 = require('web3');

export enum FakeDataJson {
    demo1 = 'demo 1',
    demo2 = 'demo 2',
    demo3 = 'demo 3',
}
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
    isSubmitting = false;
    fakeDemo = [
        {
            name: 'demo 1',
            index: 1,
        },
        {
            name: 'demo 2',
            index: 2,
        },
        {
            name: 'demo 3',
            index: 3,
        },
        {
            name: 'demo 4',
            index: 4,
        },
        {
            name: 'demo 5',
            index: 5,
        },
    ];
    constructor(
        public dialogRef: MatDialogRef<DialogCreateNFTComponent>,
        private _formBuilder: FormBuilder,
        private toastr: ToastrService,
        private fireStorage: AngularFireStorage,
        private _fuseLoadingService: FuseLoadingService,
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
        this._fuseLoadingService.hide();
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

    async submitForm(): Promise<any> {
        if (
            typeof window.ethereum === 'undefined' ||
            this.form.invalid ||
            !this.uploadedImageUrl
        ) {
            return;
        }
        this.isSubmitting = true;
        this._fuseLoadingService.show();
        const { name, description, price } = this.form.value;
        const payload = {
            attributes: [],
            description,
            name,
            price,
            image: this.uploadedImageUrl,
        };
        // Convert formData to JSON string
        const jsonData = JSON.stringify(payload);
        const fileName = `${name.split(' ')[0]}.json`;
        const filePath = `metadata/${fileName}`;
        // Create a new Blob object
        const blob = new Blob([jsonData], { type: 'application/json' });

        const uploadFileJson = await this.fireStorage.upload(filePath, blob);
        const url = await uploadFileJson.ref.getDownloadURL();

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const demo =
            this.fakeDemo.find(
                (data: { name: string; index: number }) => data.name === name
            ) ?? null;
        if (demo) {
            contract.methods
                .mintNFT(this.data, this.getFakeTokenUri(demo.index))
                .send({ from: this.data })
                .then(() => {
                    this.isSubmitting = false;
                    this._fuseLoadingService.hide();
                    this.dialogRef.close(payload);
                })
                .catch((error) => {
                    this._fuseLoadingService.hide();
                    console.error('Error:', error);
                });
            return;
        }
        if (url) {
            contract.methods
                .mintNFT(this.data, url)
                .send({ from: this.data })
                .then(() => {
                    this.isSubmitting = false;
                    this._fuseLoadingService.hide();
                    this.dialogRef.close(payload);
                })
                .catch((error) => {
                    this._fuseLoadingService.hide();
                    console.error('Error:', error);
                });
        }
    }

    onCancelForm(itemRef: any): void {
        this.dialogRef.close(itemRef);
    }

    async onFileChange(event: Event): Promise<any> {
        const reader = new FileReader();
        const target = event.target as HTMLInputElement;
        const file: File = target.files[0];
        if (target.files && file) {
            this.fileUpload = file;
            reader.readAsDataURL(file);
            reader.onload = (): void => {
                this.uploadedImageUrl = reader.result;
            };
            const filePath = `images/${file.name}`;
            const uploadTask = await this.fireStorage.upload(filePath, file);
            const url = await uploadTask.ref.getDownloadURL();
            this.uploadedImageUrl = url;
        }
    }

    abbreviatedStr(value: string): string {
        if (!value) {
            return '';
        }
        return value.substr(0, 4) + '....' + value.substr(-4);
    }

    getFakeTokenUri(value: string | number): string {
        return `https://raw.githubusercontent.com/chuhueu/nft-marketplace/main/src/app/metadata/${value}.json`;
    }
}
