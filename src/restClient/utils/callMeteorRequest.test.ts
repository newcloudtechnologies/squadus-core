/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import axios, { type AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    handleMeteorResponse,
    parseMeteorRequestArguments,
} from './callMeteorRequest';
import { RestErrors, StatusCode } from '../constants';

const RESPONSE = 'axios-response';
const ADD_USERS_PARAMS = [
    {
        rid: 'roomId',
        users: ['user'],
    },
];
const METHOD_CALL = 'method.call/';
const METEOR_METHOD = 'addUsersToRoom';

describe('callMeteorRequest', () => {
    describe('handleMeteorResponse', () => {
        let httpClient: AxiosInstance;
        let mock: MockAdapter;
        beforeEach(function () {
            httpClient = axios.create();
            mock = new MockAdapter(httpClient);
        });

        it(`should return ${RESPONSE} if correct params were passed`, async () => {
            const data = {
                message: JSON.stringify({
                    result: RESPONSE,
                }),
                success: true,
            };
            const params = { params: ADD_USERS_PARAMS };

            mock.onPost(`${METHOD_CALL}${METEOR_METHOD}`, params).reply(
                StatusCode.OK,
                data,
            );

            const response = await httpClient.post(
                `${METHOD_CALL}${METEOR_METHOD}`,
                params,
            );
            expect(handleMeteorResponse(response)).toEqual(RESPONSE);
        });
        it('should throw error if response message contains error', async () => {
            const data = {
                message: JSON.stringify({
                    result: RESPONSE,
                    error: { errorType: RestErrors.TotpInvalid },
                }),
                success: false,
            };

            const params = { params: ADD_USERS_PARAMS };

            mock.onPost(`${METHOD_CALL}${METEOR_METHOD}`, params).reply(
                StatusCode.OK,
                data,
            );

            const response = await httpClient.post(
                `${METHOD_CALL}${METEOR_METHOD}`,
                params,
            );
            expect(() => handleMeteorResponse(response)).toThrow();
        });
    });
    describe('parseMeteorRequestArguments', () => {
        it('should return url and parsed data', () => {
            const data = {
                method: METEOR_METHOD,
                params: ADD_USERS_PARAMS,
            };
            const args = {
                url: `${METHOD_CALL}${METEOR_METHOD}`,
                data: {
                    message: JSON.stringify(data),
                },
            };
            expect(parseMeteorRequestArguments(data)).toStrictEqual(args);
        });
    });
});
