import { Errors } from '../constants';
export declare class RestClientError extends Error {
    code: string;
    error: unknown;
    constructor(code: Errors | undefined, error: unknown);
}
