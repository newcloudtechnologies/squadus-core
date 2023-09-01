"use strict";
/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./models"), exports);
__exportStar(require("./restAPI/addUserToRoom"), exports);
__exportStar(require("./restAPI/changeRoles"), exports);
__exportStar(require("./restAPI/createChannel"), exports);
__exportStar(require("./restAPI/createDirectRoom"), exports);
__exportStar(require("./restAPI/createUser"), exports);
__exportStar(require("./restAPI/getHistory"), exports);
__exportStar(require("./restAPI/getRoomInfo"), exports);
__exportStar(require("./restAPI/getSettings"), exports);
__exportStar(require("./restAPI/getUserInfoByUsername"), exports);
__exportStar(require("./restAPI/login"), exports);
__exportStar(require("./restAPI/readRoom"), exports);
__exportStar(require("./restAPI/removeUserFromRoom"), exports);
__exportStar(require("./restAPI/saveRoomSettings"), exports);
__exportStar(require("./restAPI/sccCallStart"), exports);
__exportStar(require("./restAPI/sccCreateConference"), exports);
__exportStar(require("./restAPI/sccGetConferenceInfo"), exports);
__exportStar(require("./restAPI/sendAttachment"), exports);
__exportStar(require("./restAPI/sendMessage"), exports);
__exportStar(require("./restAPI/setUserPreferences"), exports);
__exportStar(require("./utilsTypes"), exports);
//# sourceMappingURL=index.js.map