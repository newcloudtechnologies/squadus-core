import { type AxiosInstance } from 'axios';
import { ErrorData } from '../errorHandlers';
export type MeteorRequestData = {
    method: string;
    params: any[];
};
export type CallMeteorRequest = {
    (params: MeteorRequestData & {
        httpClient: AxiosInstance;
    }, specificMethodErrorHandler?: (error: ErrorData) => void): Promise<any>;
};
