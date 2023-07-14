import { Document, DocumentSig } from "../documents";
import { FullText } from "../fields";
import { InputSource } from "../inputs";
export interface ResponseProps {
    httpResponse: any;
    documentType?: string;
    input?: InputSource;
    error: boolean;
}
export type ResponseSig<DocType extends Document> = {
    new (documentClass: DocumentSig<DocType>, params: ResponseProps): Response<DocType>;
};
/**
 * Base class for all responses.
 */
export declare class Response<DocType extends Document> {
    httpResponse: any;
    inputFile?: InputSource;
    document?: DocType;
    pages: Array<DocType>;
    readonly documentClass: DocumentSig<DocType>;
    constructor(documentClass: DocumentSig<DocType>, params: ResponseProps);
    protected formatResponse(documentType?: string): void;
    protected getPageText(httpDataDocument: any, pageId: number): FullText;
}
