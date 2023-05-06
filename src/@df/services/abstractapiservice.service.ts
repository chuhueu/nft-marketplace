import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { EMPTY, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { MessageService } from '@df/services/message/message.service';

import { AbstractItemDTO } from '@df/dtos/abstract-item.dto';

@Injectable({
    providedIn: 'root'
})
export abstract class AbstractApiService<DTO extends AbstractItemDTO> {

    protected httpOptionsJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' }) };
    protected httpOptionsForm = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }) };

    constructor(protected http: HttpClient, protected messageService: MessageService) { }


    protected createEntity(entity: DTO, apiEndpoint: string): Observable<DTO> {
        return this.http.post<DTO>(apiEndpoint, entity, this.httpOptionsJson)
            .pipe(
                tap((newEntity: DTO) => this.log(`Entity with code=${newEntity.code} created`)),
                catchError(this.handleError<DTO>('ApiService: Cannot add a new deceased person!'))
            );
    }

    protected getEntityByCode(code: string, apiEndpoint: string): Observable<DTO> {
        return this.http.get<DTO>(apiEndpoint + `/${code}`)
            .pipe(
                tap(_ => this.log(`Fetched entity with code: ${code}`)),
                catchError(this.handleError<DTO>(`ApiService: Cannot fetched entity with code: ${code}!`))
            );
    }

    protected getEntities(apiEndpoint: string): Observable<DTO[]> {
        return this.http.get<DTO[]>(apiEndpoint)
            .pipe(
                tap(_ => this.log('Fetched entity!')),
                catchError(this.handleError<DTO[]>('ApiService: Cannot fetch entity properly!', []))
            );
    }

    protected getEntitiesWithAttributes(attributes: string, apiEndpoint: string): Observable<DTO[]> {
        var body: HttpParams = new HttpParams();
        body = body.set('attributeNames', attributes);

        return this.http.post<DTO[]>(apiEndpoint, body, this.httpOptionsForm)
            .pipe(
                tap(_ => this.log('Fetched entries with specified attributes!')),
                catchError(this.handleError<DTO[]>('ApiService: Cannot fetch entities!', []))
            );
    }


    protected getEntitiesWithAttributesOnFieldName(fieldName: string, fieldValue: string, attributes: string, apiEndpoint: string): Observable<DTO[]> {
        var body: HttpParams = new HttpParams()
            .set('fieldName', fieldName)
            .set('fieldValue', fieldValue)
            .set('attributeNames', attributes);

        return this.http.post<DTO[]>(apiEndpoint, body, this.httpOptionsForm)
            .pipe(
                tap(_ => this.log('Fetched entries with specified attributes!')),
                catchError(this.handleError<DTO[]>('ApiService: Cannot fetch entities!', []))
            );
    }

    protected updateEntity(entity: DTO, apiEndpoint: string): Observable<DTO> {
        return this.http.put<DTO>(apiEndpoint, entity, this.httpOptionsJson)
            .pipe(
                tap(_ => this.log(`Updated entity with code: ${entity.code}`)),
                catchError(this.handleError<any>(`ApiService: Cannot updated entity with code: ${entity.code}!`))
            );
    }

    protected deleteEntity(deceasedProfile: DTO | string, apiEndpoint: string): Observable<any> {
        var code = typeof deceasedProfile === 'string' ? deceasedProfile : deceasedProfile.code;
        return this.http.delete<DTO>(apiEndpoint + `/${code}`, this.httpOptionsJson)
            .pipe(
                tap(_ => this.log(`Deleted entity with code: ${code}`)),
                catchError(this.handleError<DTO>(`ApiService: Cannot delete the selected entity with code: ${code}!`))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a ApiService message with the MessageService */
    protected log(message: string) {
        this.messageService.add(`ApiService: ${message}`);
    }

    protected throwApiNotAvailableException() {
        throw new Error('This API is not available!');
        return EMPTY;
    }
}
