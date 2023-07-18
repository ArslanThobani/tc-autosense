import { InputSource } from "../inputs";
import { PositionField, FullText, OrientationField, StringDict } from "../fields";
export type DocumentSig<DocType extends Document> = {
    new ({ prediction, orientation, extras, pageId, fullText, documentType, inputSource, }: DocumentConstructorProps): DocType;
};
export interface DocumentConstructorProps extends BaseDocumentConstructorProps {
    /** JSON parsed prediction from HTTP response */
    prediction: StringDict;
}
interface BaseDocumentConstructorProps {
    /** Orientation JSON for page-level document */
    orientation?: StringDict;
    /** Extras JSON */
    extras?: StringDict;
    /** input file given to parse the document */
    inputSource?: InputSource;
    /** Page ID for page-level document */
    pageId?: number;
    /** full OCR extracted text */
    fullText?: FullText;
    documentType?: string;
}
export declare class Document {
    checklist: {
        [index: string]: boolean;
    };
    mimeType?: string;
    filename: string;
    filepath?: string;
    fullText?: FullText;
    pageId?: number | undefined;
    orientation?: OrientationField;
    cropper: PositionField[];
    readonly docType: string;
    constructor({ orientation, extras, inputSource, fullText, pageId, documentType, }: BaseDocumentConstructorProps);
    clone(): any;
    /** return true if all checklist of the document if true */
    checkAll(): boolean;
    /**
     * Takes a list of Documents and return one Document where
     * each field is set with the maximum probability field
     * @param {Array<Document>} documents - A list of Documents
     */
    static mergePages(documents: any): any;
    static cleanOutString(outStr: string): string;
}
export {};
