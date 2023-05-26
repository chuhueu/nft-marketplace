import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  ) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.form = this._formBuilder.group({
        price: [null, Validators.required],
        name: [null, Validators.required],
        fileUpload: [null, Validators.required],
        description: [null]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  submitForm(): void {
    this.toastr.success('NFT đã được tạo thành công');
    if (this.form.invalid) {
      return;
    }

    console.log(this.form);
  }

}
