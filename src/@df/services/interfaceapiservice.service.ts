import { Observable } from 'rxjs';

import { AbstractItemDTO } from '@df/dtos/abstract-item.dto';

export interface InterfaceApiService<DTO extends AbstractItemDTO> {

    /**
     * Create an entity.
     *
     * @param {DTO} entity The entity to create.
     * @returns The created entity.
     */
    createEntity(entity: DTO): Observable<DTO>;

    /**
     * Retrieve an entity specified by the provided code.
     *
     * @param {string} code The code of the entity.
     * @returns The entity with the specifiying code.
     */
    getEntityByCode(code: string): Observable<DTO>;

    /**
     * Retrieves all available entities.
     *
     * @returns An array of all available entities.
     */
    getEntities(): Observable<DTO[]>;

    /**
     * Retrieves all available entities, which contain the provided attribute names.
     *
     * @param {string} attributes The list of attributes names to get populated.
     * @returns An array of all available entities.
     */
    getEntitiesWithAttributes(attributes: string): Observable<DTO[]>;


    /**
     * Retrieves all available entities, which contain the provided attribute names
     * where the field name is provided for a specific value.
     *
     * @param {string} fieldName The name of the field to look for.
     * @param {string} fieldValue The value for the field name.
     * @param {string} attributes The list of attributes names to get populated.
     * @param {string} apiEndpoint The endpoint to update the entity
     * @returns An array of all available entities.
     */
    getEntitiesWithAttributesOnFieldName(fieldName: string, fieldValue: string, attributes: string, apiEndpoint: string): Observable<DTO[]>;

    /**
     * Update the provided entity.
     *
     * @param {DTO} entity The entity to get updated.
     * @returns The updated entity.
     */
    updateEntity(entity: DTO): Observable<DTO>

    /**
     * Delete the entity from the provided code.
     *
     * @param {DTO | string} entityOrCode The DTO object or string of entity code
     *                       is reference the entity and will be deleted.
     * @returns An header telling if deletion was successful.
     */
    deleteEntity(entityOrCode: DTO | string): Observable<any>;

}