import { CallMeteorRequest, MeteorRequestData } from '../types';
export declare const handleMeteorResponse: (response: any) => any;
export declare const parseMeteorRequestArguments: ({ method, params, }: MeteorRequestData) => {
    data: {
        message: string;
    };
    url: string;
};
export declare const callMeteorRequest: CallMeteorRequest;
