export type CreateTeamRequestParams = {
    encrypted: boolean;
    isPrivate: boolean;
    members: string[];
    name: string;
    readOnly: boolean;
};
