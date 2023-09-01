"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const callMeteorRequest_1 = require("./callMeteorRequest");
const constants_1 = require("../constants");
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
        let httpClient;
        let mock;
        beforeEach(function () {
            httpClient = axios_1.default.create();
            mock = new axios_mock_adapter_1.default(httpClient);
        });
        it(`should return ${RESPONSE} if correct params were passed`, async () => {
            const data = {
                message: JSON.stringify({
                    result: RESPONSE,
                }),
                success: true,
            };
            const params = { params: ADD_USERS_PARAMS };
            mock.onPost(`${METHOD_CALL}${METEOR_METHOD}`, params).reply(constants_1.StatusCode.OK, data);
            const response = await httpClient.post(`${METHOD_CALL}${METEOR_METHOD}`, params);
            expect((0, callMeteorRequest_1.handleMeteorResponse)(response)).toEqual(RESPONSE);
        });
        it('should throw error if response message contains error', async () => {
            const data = {
                message: JSON.stringify({
                    result: RESPONSE,
                    error: { errorType: constants_1.RestErrors.TotpInvalid },
                }),
                success: false,
            };
            const params = { params: ADD_USERS_PARAMS };
            mock.onPost(`${METHOD_CALL}${METEOR_METHOD}`, params).reply(constants_1.StatusCode.OK, data);
            const response = await httpClient.post(`${METHOD_CALL}${METEOR_METHOD}`, params);
            expect(() => (0, callMeteorRequest_1.handleMeteorResponse)(response)).toThrow();
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
            expect((0, callMeteorRequest_1.parseMeteorRequestArguments)(data)).toStrictEqual(args);
        });
    });
});
//# sourceMappingURL=callMeteorRequest.test.js.map