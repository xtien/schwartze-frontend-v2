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


// May contain unused imports in some cases
// @ts-ignore
import type { PageReference } from './page-reference';

/**
 * 
 * @export
 * @interface PageReferenceRequest
 */
export interface PageReferenceRequest {
    /**
     * 
     * @type {string}
     * @memberof PageReferenceRequest
     */
    'page_number'?: string;
    /**
     * 
     * @type {string}
     * @memberof PageReferenceRequest
     */
    'chapter_number'?: string;
    /**
     * 
     * @type {PageReference}
     * @memberof PageReferenceRequest
     */
    'reference'?: PageReference;
}

