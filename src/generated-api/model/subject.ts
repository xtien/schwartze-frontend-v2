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
import type { Text } from './text';
// May contain unused imports in some cases
// @ts-ignore
import type { Title } from './title';

/**
 * 
 * @export
 * @interface Subject
 */
export interface Subject {
    /**
     * 
     * @type {{ [key: string]: Title; }}
     * @memberof Subject
     */
    'titles'?: { [key: string]: Title; };
    /**
     * 
     * @type {number}
     * @memberof Subject
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof Subject
     */
    'name'?: string;
    /**
     * 
     * @type {Text}
     * @memberof Subject
     */
    'text'?: Text;
}

