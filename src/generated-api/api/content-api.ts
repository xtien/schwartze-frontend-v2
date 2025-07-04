/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { ContentRequest } from '../model';
// @ts-ignore
import type { ContentResult } from '../model';
/**
 * ContentApi - axios parameter creator
 * @export
 */
export const ContentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ContentRequest} contentRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent: async (contentRequest: ContentRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'contentRequest' is not null or undefined
            assertParamExists('getContent', 'contentRequest', contentRequest)
            const localVarPath = `/getContent/`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(contentRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ContentApi - functional programming interface
 * @export
 */
export const ContentApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ContentApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {ContentRequest} contentRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContent(contentRequest: ContentRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContentResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getContent(contentRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ContentApi.getContent']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ContentApi - factory interface
 * @export
 */
export const ContentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ContentApiFp(configuration)
    return {
        /**
         * 
         * @param {ContentRequest} contentRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent(contentRequest: ContentRequest, options?: RawAxiosRequestConfig): AxiosPromise<ContentResult> {
            return localVarFp.getContent(contentRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ContentApi - object-oriented interface
 * @export
 * @class ContentApi
 * @extends {BaseAPI}
 */
export class ContentApi extends BaseAPI {
    /**
     * 
     * @param {ContentRequest} contentRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public getContent(contentRequest: ContentRequest, options?: RawAxiosRequestConfig) {
        return ContentApiFp(this.configuration).getContent(contentRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

