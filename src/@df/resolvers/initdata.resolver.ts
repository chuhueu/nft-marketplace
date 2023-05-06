import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, empty } from 'rxjs';
import { catchError, delay, startWith } from 'rxjs/operators';

import { AddressService } from '@df/services/address/address.service';


@Injectable({
    providedIn: 'root'
})
export class InitDataResolver implements Resolve<any> {

    onDataChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {AddressService} addressService
     */
    constructor(
        private addressService: AddressService
    ) {
        // Set the defaults
        this.onDataChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        /*
        return this.deceasedProfileService.getNumberOfProfiles().pipe(
            startWith(empty()),
            delay(0),
            catchError((error) => {
                return empty();
            })
        );
        */

        return this.getNumberOfAddresses();
    }

    /**
    * Get number of available entities.
    *
    * @returns {Promise<any>}
    */
    getNumberOfAddresses(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.addressService.getEntities()
                .subscribe((response: any) => {
                    this.onDataChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

}
