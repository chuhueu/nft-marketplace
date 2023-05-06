import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { MessageService } from '@df/services/message/message.service';

import { ApiConfig } from '@df/configs/api.config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  httpOptionsJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  httpOptionsForm = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };


  constructor(private http: HttpClient, private messageService: MessageService) { }

  searchDataBySearchTerm(searchTerm: string): Observable<any[]> {
    if (!searchTerm.trim()) {
      // if not search term, return empty decease person array.
      return of([]);
    }

    let body: HttpParams = new HttpParams();
    body = body.append('searchTerm', searchTerm);
    // TODO: needs to replace the search endpoint
    return this.http.post<any[]>('http://localhost/search/any/by_search_term', body, this.httpOptionsForm)
      .pipe(
        tap(_ => this.log('Fetched data - by any!')),
        catchError(this.handleError<any[]>('SearchService: Cannot fetch data properly!', []))
      );
  }

  getDataOnLandingPage(): Observable<any[]> {
    // TODO: needs to replace the search endpoint
    return this.http.post<any[]>('http://localhost/search/any/by_last_created', this.httpOptionsJson)
      .pipe(
        tap(_ => this.log('Fetched deceased people - by last created!')),
        catchError(this.handleError<any[]>('SearchService: Cannot fetch data properly!', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SearchService: ${message}`);
  }

}
