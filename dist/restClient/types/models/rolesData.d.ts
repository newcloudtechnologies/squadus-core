export type RoleData = {
    _id: string;
    description: string;
    mandatory2fa: boolean;
    name: string;
    protected: boolean;
    scope: string;
};
export type GetRolesListResponse = {
    roles: RoleData[];
    success: boolean;
};
