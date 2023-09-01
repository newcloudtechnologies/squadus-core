"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.E2EType = void 0;
var E2EType;
(function (E2EType) {
    E2EType["Done"] = "done";
    E2EType["Pending"] = "pending";
})(E2EType = exports.E2EType || (exports.E2EType = {}));
var MessageType;
(function (MessageType) {
    MessageType["DiscussionCreated"] = "discussion-created";
    MessageType["Encrypted"] = "e2e";
    MessageType["ForwardMessage"] = "forward-message";
    MessageType["JitsiCallStarted"] = "jitsi_call_started";
    MessageType["JitsiCallThread"] = "jitsi_call_thread";
    MessageType["LoadMore"] = "load_more";
    MessageType["Removed"] = "rm";
    MessageType["UserJoined"] = "uj";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
//# sourceMappingURL=message.js.map