/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { validateRestResponse } from './validateRestResponse';
import { AxiosErrorResponse } from './handleRestErrorByResponse';
import { StatusCode } from '../constants';

const getAxiosResponseWithErrorData = (
    isSuccess = true,
): AxiosErrorResponse => {
    return {
        data: {
            details: {},
            error: '',
            errorType: '',
            success: isSuccess,
        },
        status: StatusCode.OK,
        statusText: 'success',
        headers: {},
        // @ts-expect-error
        config: {},
    };
};

describe('validateRestResponse', () => {
    it('should not throw an error when SUCCESS is true', () => {
        const response = getAxiosResponseWithErrorData();
        expect(validateRestResponse(response)).toBe(undefined);
    });
    it('should throw an error when SUCCESS is false', () => {
        const response = getAxiosResponseWithErrorData(false);
        expect(() => validateRestResponse(response)).toThrow();
    });
});
