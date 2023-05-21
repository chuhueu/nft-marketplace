import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-data-example',
  templateUrl: 'dialog-warning.component.html',
})
export class DialogWarningComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
