import { Document, DocumentConstructorProps } from "../document";
import { StringDict } from "../../fields";
export declare class PageGroup {
    pageIndexes: number[];
    confidence: number;
    constructor(prediction: StringDict);
    toString(): string;
}
export declare class InvoiceSplitterV1 extends Document {
    /** List of page indexes that belong to the same invoice in the PDF. */
    invoicePageGroups: PageGroup[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
