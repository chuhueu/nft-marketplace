import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NFTService {
    /**
     * Constructor
     */
    apiUrl = `${environment.apiUrl}/nft`;
    constructor(private _httpService: HttpClient) {}

    getNFTTrades(tokenAddress: string): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/trades`, {
            params: {
                contractAddress: tokenAddress,
            },
        });
    }

    searchNFTs(searchTerm?: string, filterByField?: string): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/search`, {
            params: {
                searchTerm: searchTerm ?? 'art',
                field: filterByField ?? 'name',
            },
        });
    }

    getNFTOwners(
        address: string,
        tokenId: string,
        chain: string
    ): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/owners`, {
            params: { address, tokenId, chain },
        });
    }

    getNFTByWallet(address: string, chain: string): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/wallet`, {
            params: { address, chain },
        });
    }

    getNFTByContract(address: string, chain: string): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/contract`, {
            params: { address, chain },
        });
    }

    getTransactionByWallet(address: string, chain: string): Observable<any> {
        return this._httpService.get(`${this.apiUrl}/transactions`, {
            params: { address, chain },
        });
    }

    getDataTokenURI(tokenUri: string): Observable<any> {
        return this._httpService.get(tokenUri);
    }
}
