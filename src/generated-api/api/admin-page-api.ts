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
import type { PageReferenceRequest } from '../model';
// @ts-ignore
import type { PageRequest } from '../model';
// @ts-ignore
import type { PageResult } from '../model';
// @ts-ignore
import type { UpdatePageRequest } from '../model';
/**
 * AdminPageApi - axios parameter creator
 * @export
 */
export const AdminPageApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPage: async (pageRequest: PageRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'pageRequest' is not null or undefined
            assertParamExists('addPage', 'pageRequest', pageRequest)
            const localVarPath = `/admin/addPage/`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(pageRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPageReference: async (pageReferenceRequest: PageReferenceRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'pageReferenceRequest' is not null or undefined
            assertParamExists('addPageReference', 'pageReferenceRequest', pageReferenceRequest)
            const localVarPath = `/admin/addPageReference/`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(pageReferenceRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePage: async (pageRequest: PageRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'pageRequest' is not null or undefined
            assertParamExists('removePage', 'pageRequest', pageRequest)
            const localVarPath = `/admin/removePage/`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(pageRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePageReference: async (pageReferenceRequest: PageReferenceRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'pageReferenceRequest' is not null or undefined
            assertParamExists('removePageReference', 'pageReferenceRequest', pageReferenceRequest)
            const localVarPath = `/admin/removePageReference/`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(pageReferenceRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdatePageRequest} updatePageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePage: async (updatePageRequest: UpdatePageRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'updatePageRequest' is not null or undefined
            assertParamExists('updatePage', 'updatePageRequest', updatePageRequest)
            const localVarPath = `/admin/updatePage/`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(updatePageRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AdminPageApi - functional programming interface
 * @export
 */
export const AdminPageApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AdminPageApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addPage(pageRequest: PageRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addPage(pageRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AdminPageApi.addPage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addPageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addPageReference(pageReferenceRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AdminPageApi.addPageReference']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removePage(pageRequest: PageRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removePage(pageRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AdminPageApi.removePage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removePageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removePageReference(pageReferenceRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AdminPageApi.removePageReference']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {UpdatePageRequest} updatePageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePage(updatePageRequest: UpdatePageRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageResult>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePage(updatePageRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AdminPageApi.updatePage']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AdminPageApi - factory interface
 * @export
 */
export const AdminPageApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AdminPageApiFp(configuration)
    return {
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPage(pageRequest: PageRequest, options?: RawAxiosRequestConfig): AxiosPromise<PageResult> {
            return localVarFp.addPage(pageRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addPageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig): AxiosPromise<PageResult> {
            return localVarFp.addPageReference(pageReferenceRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {PageRequest} pageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePage(pageRequest: PageRequest, options?: RawAxiosRequestConfig): AxiosPromise<PageResult> {
            return localVarFp.removePage(pageRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {PageReferenceRequest} pageReferenceRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removePageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig): AxiosPromise<PageResult> {
            return localVarFp.removePageReference(pageReferenceRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpdatePageRequest} updatePageRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePage(updatePageRequest: UpdatePageRequest, options?: RawAxiosRequestConfig): AxiosPromise<PageResult> {
            return localVarFp.updatePage(updatePageRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AdminPageApi - object-oriented interface
 * @export
 * @class AdminPageApi
 * @extends {BaseAPI}
 */
export class AdminPageApi extends BaseAPI {
    /**
     * 
     * @param {PageRequest} pageRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AdminPageApi
     */
    public addPage(pageRequest: PageRequest, options?: RawAxiosRequestConfig) {
        return AdminPageApiFp(this.configuration).addPage(pageRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {PageReferenceRequest} pageReferenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AdminPageApi
     */
    public addPageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig) {
        return AdminPageApiFp(this.configuration).addPageReference(pageReferenceRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {PageRequest} pageRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AdminPageApi
     */
    public removePage(pageRequest: PageRequest, options?: RawAxiosRequestConfig) {
        return AdminPageApiFp(this.configuration).removePage(pageRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {PageReferenceRequest} pageReferenceRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AdminPageApi
     */
    public removePageReference(pageReferenceRequest: PageReferenceRequest, options?: RawAxiosRequestConfig) {
        return AdminPageApiFp(this.configuration).removePageReference(pageReferenceRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UpdatePageRequest} updatePageRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AdminPageApi
     */
    public updatePage(updatePageRequest: UpdatePageRequest, options?: RawAxiosRequestConfig) {
        return AdminPageApiFp(this.configuration).updatePage(updatePageRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

