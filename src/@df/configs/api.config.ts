import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    API_ENDPOINT: string;
    API_ENDPOINT_V1: string;
}

export const AppConfig: IAppConfig = {
    API_ENDPOINT: 'http://localhost:8080/api',
    API_ENDPOINT_V1: 'http://localhost:8080/api/v1'
};

export class ApiConfig {
    public static PORT = ':8080';
    public static HOST_ENDPOINT = 'http://localhost' + ApiConfig.PORT;

    public static CODE = '/code';
    public static BY_FIELD = '/by-field';
    public static NUMBER_OF_ALL_ENTITIES = '/entity-count';

    public static API_ENDPOINT = ApiConfig.HOST_ENDPOINT + '/api';
    public static API_ENDPOINT_V1 = ApiConfig.API_ENDPOINT + '/v1';
    public static API_V1_ADAPTIVE = ApiConfig.API_ENDPOINT_V1 + '/adaptive';


    public static SEARCH_ENDPOINT = ApiConfig.HOST_ENDPOINT + '/search';

    public static ADDRESS = '/address';
    public static API_ENDPOINT_ADDRESS = ApiConfig.API_ENDPOINT_V1 + ApiConfig.ADDRESS;
    public static API_ENDPOINT_ADAPTIVE_ADDRESS = ApiConfig.API_V1_ADAPTIVE + ApiConfig.ADDRESS;
    public static API_ENDPOINT_ADAPTIVE_ADDRESS_BY_FIELD = ApiConfig.API_ENDPOINT_ADAPTIVE_ADDRESS + ApiConfig.BY_FIELD;
    public static API_ENDPOINT_ADDRESS_PDP_BY_CODE = ApiConfig.API_ENDPOINT_ADDRESS + ApiConfig.CODE;

    public static BURIALRITE = '/burial-rite';
    public static API_ENDPOINT_BURIALRITE = ApiConfig.API_ENDPOINT_V1 + ApiConfig.BURIALRITE;
    public static API_ENDPOINT_ADAPTIVE_BURIALRITE = ApiConfig.API_V1_ADAPTIVE + ApiConfig.BURIALRITE;
    public static API_ENDPOINT_ADAPTIVE_BURIALRITE_BY_FIELD = ApiConfig.API_ENDPOINT_ADAPTIVE_BURIALRITE + ApiConfig.BY_FIELD;
    public static API_ENDPOINT_BURIALRITE_PDP_BY_CODE = ApiConfig.API_ENDPOINT_BURIALRITE + ApiConfig.CODE;

    public static SALUTATION = '/salutation';
    public static API_ENDPOINT_SALUTATION = ApiConfig.API_ENDPOINT_V1 + ApiConfig.SALUTATION;
    public static API_ENDPOINT_ADAPTIVE_SALUTATION = ApiConfig.API_V1_ADAPTIVE + ApiConfig.SALUTATION;
    public static API_ENDPOINT_ADAPTIVE_SALUTATION_BY_FIELD = ApiConfig.API_ENDPOINT_ADAPTIVE_SALUTATION + ApiConfig.BY_FIELD;
    public static API_ENDPOINT_SALUTATION_PDP_BY_CODE = ApiConfig.API_ENDPOINT_SALUTATION + ApiConfig.CODE;

    public static TITLE = '/title';
    public static API_ENDPOINT_TITLE = ApiConfig.API_ENDPOINT_V1 + ApiConfig.TITLE;
    public static API_ENDPOINT_ADAPTIVE_TITLE = ApiConfig.API_V1_ADAPTIVE + ApiConfig.TITLE;
    public static API_ENDPOINT_ADAPTIVE_TITLE_BY_FIELD = ApiConfig.API_ENDPOINT_ADAPTIVE_TITLE + ApiConfig.BY_FIELD;
    public static API_ENDPOINT_TITLE_PDP_BY_CODE = ApiConfig.API_ENDPOINT_TITLE + ApiConfig.CODE;

}