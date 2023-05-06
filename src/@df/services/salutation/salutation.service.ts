import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractApiService } from '@df/services/abstractapiservice.service';
import { InterfaceApiService } from '@df/services/interfaceapiservice.service';

import { ApiConfig } from '@df/configs/api.config';

import { SalutationDTO } from '@df/dtos/salutation.dto';

@Injectable({
    providedIn: 'root'
})
export class SalutationService extends AbstractApiService<SalutationDTO> implements InterfaceApiService<SalutationDTO> {

    createEntity(entity: SalutationDTO): Observable<SalutationDTO> {
        return super.createEntity(entity, ApiConfig.API_ENDPOINT_SALUTATION);
    }

    getEntityByCode(code: string): Observable<SalutationDTO> {
        return super.getEntityByCode(code, ApiConfig.API_ENDPOINT_SALUTATION_PDP_BY_CODE);
    }

    getEntities(): Observable<SalutationDTO[]> {
        return super.getEntities(ApiConfig.API_ENDPOINT_SALUTATION);
    }

    getEntitiesWithAttributes(attributes: string): Observable<SalutationDTO[]> {
        return super.getEntitiesWithAttributes(attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_SALUTATION)
    }

    getEntitiesWithAttributesOnFieldName(fieldName: string, fieldValue: string, attributes: string): Observable<SalutationDTO[]> {
        return super.getEntitiesWithAttributesOnFieldName(fieldName, fieldValue, attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_SALUTATION_BY_FIELD)
    }

    updateEntity(entity: SalutationDTO): Observable<SalutationDTO> {
        return super.updateEntity(entity, ApiConfig.API_ENDPOINT_SALUTATION);
    }

    deleteEntity(entityOrCode: SalutationDTO | string): Observable<any> {
        return super.deleteEntity(entityOrCode, ApiConfig.API_ENDPOINT_SALUTATION_PDP_BY_CODE);
    }

}
