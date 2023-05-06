import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractApiService } from '@df/services/abstractapiservice.service';
import { InterfaceApiService } from '@df/services/interfaceapiservice.service';

import { ApiConfig } from '@df/configs/api.config';

import { TitleDTO } from '@df/dtos/title.dto';

@Injectable({
    providedIn: 'root'
})
export class TitleService extends AbstractApiService<TitleDTO> implements InterfaceApiService<TitleDTO> {

    createEntity(entity: TitleDTO): Observable<TitleDTO> {
        return super.createEntity(entity, ApiConfig.API_ENDPOINT_TITLE);
    }

    getEntityByCode(code: string): Observable<TitleDTO> {
        return super.getEntityByCode(code, ApiConfig.API_ENDPOINT_TITLE_PDP_BY_CODE);
    }

    getEntities(): Observable<TitleDTO[]> {
        return super.getEntities(ApiConfig.API_ENDPOINT_TITLE);
    }

    getEntitiesWithAttributes(attributes: string): Observable<TitleDTO[]> {
        return super.getEntitiesWithAttributes(attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_TITLE)
    }

    getEntitiesWithAttributesOnFieldName(fieldName: string, fieldValue: string, attributes: string): Observable<TitleDTO[]> {
        return super.getEntitiesWithAttributesOnFieldName(fieldName, fieldValue, attributes, ApiConfig.API_ENDPOINT_ADAPTIVE_TITLE_BY_FIELD)
    }

    updateEntity(entity: TitleDTO): Observable<TitleDTO> {
        return super.updateEntity(entity, ApiConfig.API_ENDPOINT_TITLE);
    }

    deleteEntity(entityOrCode: TitleDTO | string): Observable<any> {
        return super.deleteEntity(entityOrCode, ApiConfig.API_ENDPOINT_TITLE_PDP_BY_CODE);
    }

}
