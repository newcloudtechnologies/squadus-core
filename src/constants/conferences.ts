/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

export enum ConferenceStatus {
    Booked = 'BOOKED',
    Created = 'CREATED',
    Ended = 'ENDED',
    Started = 'STARTED',
}

export enum ConferenceType {
    Fixed = 'FIX',
    Personal = 'PERSONAL',
    Regular = 'REGULAR',
}

export enum UserConferenceStatus {
    Declined = 'DECLINED',
    NotAnswered = 'NOT ANSWERED',
    Participate = 'PARTICIPATE',
    Participated = 'PARTICIPATED',
}
