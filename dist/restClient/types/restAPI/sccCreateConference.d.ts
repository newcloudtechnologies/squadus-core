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
