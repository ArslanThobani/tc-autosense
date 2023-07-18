import { Document, DocumentConstructorProps } from "../document";
import { Word } from "../../fields";
export declare class MindeeVisionV1 extends Document {
    /** List of words found on the page. */
    allWords: Word[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
