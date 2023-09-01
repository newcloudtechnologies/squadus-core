type LoginViaTokenProps = {
    password?: never;
    token: string;
    userName?: never;
};
type LoginViaCredentialsProps = {
    password: string;
    token?: never;
    userName: string;
};
export type LoginRequestParams = LoginViaTokenProps | LoginViaCredentialsProps;
export {};
