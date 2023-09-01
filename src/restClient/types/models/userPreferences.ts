/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export type UserPreferences = {
    desktopNotifications: string;
    emailNotificationMode: string;
    joinWithoutSound: boolean;
    joinWithoutVideo: boolean;
    language: string;
    mobileNotifications: string;
    showSettingsScreen: boolean;
    sidebarShowUnread: boolean;
    sidebarSortby: string;
    turnOffAudio: boolean;
    turnOffVideo: boolean;
    waitingRoom: boolean;
};
