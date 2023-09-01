/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { type AxiosResponse } from 'axios';

export * from './models';

export * from './restAPI/addUserToRoom';
export * from './restAPI/changeRoles';
export * from './restAPI/createChannel';
export * from './restAPI/createDirectRoom';
export * from './restAPI/createUser';
export * from './restAPI/getHistory';
export * from './restAPI/getRoomInfo';
export * from './restAPI/getSettings';
export * from './restAPI/getUserInfoByUsername';
export * from './restAPI/login';
export * from './restAPI/readRoom';
export * from './restAPI/removeUserFromRoom';
export * from './restAPI/saveRoomSettings';
export * from './restAPI/sccCallStart';
export * from './restAPI/sccCreateConference';
export * from './restAPI/sccGetConferenceInfo';
export * from './restAPI/sendAttachment';
export * from './restAPI/sendMessage';
export * from './restAPI/setUserPreferences';
export * from './utilsTypes';
export type RestResponse<T> = Promise<AxiosResponse<T> | undefined>;
