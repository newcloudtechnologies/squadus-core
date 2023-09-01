/*
 * Copyright (c) New Cloud Technologies, Ltd., 2013-2023
 *
 * You can not use the contents of the file in any way without New Cloud Technologies, Ltd. written permission.
 * To obtain such a permit, you should contact New Cloud Technologies, Ltd. at http://ncloudtech.com/contact.html
 *
 */

import { ConferenceData, ConferenceSettings } from '../models/conferenceData';
import { ConferenceType } from '../../../constants';

export type InvitationsUser = {
    id: string;
    name: string;
};

export type SccCreateConferenceRequestParams = {
    conferenceSettings: ConferenceSettings;
    invitations: InvitationsUser[];
    name: string;
    password?: string;
    plannedEndTime?: number;
    plannedStartTime?: number;
    rid?: string;
    type: ConferenceType;
};

export type SccCreateConferenceResponse = {
    data: ConferenceData;
    success: boolean;
};
