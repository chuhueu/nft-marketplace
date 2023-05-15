import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setSearchValue(value: string): void {
    this.searchValueSubject.next(value);
  }

  getSearchValue(): BehaviorSubject<string> {
    return this.searchValueSubject;
  }
}
