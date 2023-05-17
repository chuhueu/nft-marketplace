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
        price: [null, Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCancelForm(itemRef: any): void {
    this.dialogRef.close(itemRef);
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
  }

}
