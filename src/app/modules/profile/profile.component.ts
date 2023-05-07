import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subject, takeUntil, switchMap, catchError, of} from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  // Life cycle

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }

}
