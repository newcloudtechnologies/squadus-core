"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConferenceStatus = exports.ConferenceType = exports.ConferenceStatus = void 0;
var ConferenceStatus;
(function (ConferenceStatus) {
    ConferenceStatus["Booked"] = "BOOKED";
    ConferenceStatus["Created"] = "CREATED";
    ConferenceStatus["Ended"] = "ENDED";
    ConferenceStatus["Started"] = "STARTED";
})(ConferenceStatus = exports.ConferenceStatus || (exports.ConferenceStatus = {}));
var ConferenceType;
(function (ConferenceType) {
    ConferenceType["Fixed"] = "FIX";
    ConferenceType["Personal"] = "PERSONAL";
    ConferenceType["Regular"] = "REGULAR";
})(ConferenceType = exports.ConferenceType || (exports.ConferenceType = {}));
var UserConferenceStatus;
(function (UserConferenceStatus) {
    UserConferenceStatus["Declined"] = "DECLINED";
    UserConferenceStatus["NotAnswered"] = "NOT ANSWERED";
    UserConferenceStatus["Participate"] = "PARTICIPATE";
    UserConferenceStatus["Participated"] = "PARTICIPATED";
})(UserConferenceStatus = exports.UserConferenceStatus || (exports.UserConferenceStatus = {}));
//# sourceMappingURL=conferences.js.map