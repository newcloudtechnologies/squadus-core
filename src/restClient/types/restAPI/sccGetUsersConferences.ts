/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import {
    RoomUserRolesUppercase,
    UserConferenceStatus,
} from '../../../constants';

export enum MeetingRecordStatus {
    DELETED = 'DELETED',
    ERROR = 'ERROR',
    REGISTERED = 'REGISTERED',
    UPLOADED = 'UPLOADED',
}

export enum ConferenceStatus {
    CREATED = 'CREATED',
    ENDED = 'ENDED',
    STARTED = 'STARTED',
}

export type MeetingRecord = {
    availableTo?: string[];
    createdAt?: string;
    endAt?: string;
    id: string;
    mid?: string;
    shared?: boolean;
    startAt?: string;
    status: MeetingRecordStatus;
    uploadId?: string;
    url?: string;
};

export interface ConferenceListData {
    conferenceId: string;
    createdAt: string;
    creator: { id: string; name: string };
    ended: string;
    id: string;
    name: string;
    number: string;
    participants?: ConferenceParticipant[];
    records: MeetingRecord[];
    rid: string;
    started: string;
    status: string;
    type: string;
    userInfo: {
        id: string;
        role: RoomUserRolesUppercase;
        status: UserConferenceStatus;
    };
}

export type ConferenceParticipant = {
    guest: boolean;
    id: string;
    invited: boolean;
    name: string;
    role: ParticipantRole;
    status: UserConferenceStatus;
    username?: string;
};

export enum ParticipantRole {
    MODERATOR = 'MODERATOR',
    USER = 'USER',
}

export type SccGetUsersConferences = {
    count: number;
    offset: number;
    results: ConferenceListData[];
    success: boolean;
    total: number;
};
