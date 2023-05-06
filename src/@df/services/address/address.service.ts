import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractApiService } from '@df/services/abstractapiservice.service';
import { InterfaceApiService } from '@df/services/interfaceapiservice.service';

import { ApiConfig } from '@df/configs/api.config';

import { AddressDTO } from '@df/dtos/address.dto';

@Injectable({
    providedIn: 'root'
})
export class AddressService extends AbstractApiService<AddressDTO> implements InterfaceApiService<AddressDTO> {

    createEntity(entity: AddressDTO): Observable<AddressDTO> {
        return super.createEntity(entity, ApiConfig.API_ENDPOINT_ADDRESS);
    }

    getEntityByCode(code: string): Observable<AddressDTO> {
        return super.getEntityByCode(code, ApiConfig.API_ENDPOINT_ADDRESS_PDP_BY_CODE);
    }

    getEntities(): Observable<AddressDTO[]> {
        return super.getEntities(ApiConfig.API_ENDPOINT_ADDRESS);
    }

    getEntitiesWithAttributes(attributes: string): Observable<AddressDTO[]> {
        return super.getEntitiesWithAttributes(attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_ADDRESS)
    }

    getEntitiesWithAttributesOnFieldName(fieldName: string, fieldValue: string, attributes: string): Observable<AddressDTO[]> {
        return super.getEntitiesWithAttributesOnFieldName(fieldName, fieldValue, attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_ADDRESS_BY_FIELD)
    }

    updateEntity(entity: AddressDTO): Observable<AddressDTO> {
        return super.updateEntity(entity, ApiConfig.API_ENDPOINT_ADDRESS);
    }

    deleteEntity(entityOrCode: AddressDTO | string): Observable<any> {
        return super.deleteEntity(entityOrCode, ApiConfig.API_ENDPOINT_ADDRESS_PDP_BY_CODE);
    }

}
