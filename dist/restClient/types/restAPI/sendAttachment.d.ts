import FormData from 'form-data';
export type ErrorAttachmentData = {
    error: string;
    errorType: string;
    success: boolean;
};
export type SendAttachmentRequestParams = {
    form: FormData;
    rid: string;
};
