/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { type AxiosInstance } from 'axios';

import { ErrorData } from '../errorHandlers';

export type MeteorRequestData = {
    method: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any[];
};

export type CallMeteorRequest = {
    (
        params: MeteorRequestData & { httpClient: AxiosInstance },
        specificMethodErrorHandler?: (error: ErrorData) => void,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any>;
};
