"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantRole = exports.ConferenceStatus = exports.MeetingRecordStatus = void 0;
var MeetingRecordStatus;
(function (MeetingRecordStatus) {
    MeetingRecordStatus["DELETED"] = "DELETED";
    MeetingRecordStatus["ERROR"] = "ERROR";
    MeetingRecordStatus["REGISTERED"] = "REGISTERED";
    MeetingRecordStatus["UPLOADED"] = "UPLOADED";
})(MeetingRecordStatus = exports.MeetingRecordStatus || (exports.MeetingRecordStatus = {}));
var ConferenceStatus;
(function (ConferenceStatus) {
    ConferenceStatus["CREATED"] = "CREATED";
    ConferenceStatus["ENDED"] = "ENDED";
    ConferenceStatus["STARTED"] = "STARTED";
})(ConferenceStatus = exports.ConferenceStatus || (exports.ConferenceStatus = {}));
var ParticipantRole;
(function (ParticipantRole) {
    ParticipantRole["MODERATOR"] = "MODERATOR";
    ParticipantRole["USER"] = "USER";
})(ParticipantRole = exports.ParticipantRole || (exports.ParticipantRole = {}));
//# sourceMappingURL=sccGetUsersConferences.js.map