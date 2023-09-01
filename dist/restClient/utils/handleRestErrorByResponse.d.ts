import { AxiosError, type AxiosResponse } from 'axios';
import { ErrorData, RestClientError } from '../errorHandlers';
type AxiosErrorResponseData = string | ErrorData;
export type AxiosErrorResponse = AxiosResponse<AxiosErrorResponseData>;
export type AxiosErrorWithData = AxiosError<AxiosErrorResponseData>;
export declare const handleRestErrorByResponse: (error?: AxiosErrorWithData | AxiosResponse | RestClientError, specificMethodErrorHandler?: ((error: ErrorData) => void) | undefined) => never | void;
export declare function handleSpecificMethodError(error: AxiosErrorWithData, specificMethodErrorHandler?: (error: ErrorData) => void): void | never;
export declare function isRestClientError(error: AxiosErrorWithData | AxiosResponse | RestClientError): boolean;
export {};
