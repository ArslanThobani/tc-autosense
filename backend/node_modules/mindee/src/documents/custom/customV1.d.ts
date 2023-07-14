import { Document, DocumentConstructorProps } from "../document";
import { ClassificationField, ListField } from "./fields";
import { StringDict } from "../../fields";
export declare class CustomV1 extends Document {
    fields: Map<string, ListField>;
    classifications: Map<string, ClassificationField>;
    constructor({ inputSource, prediction, extras, orientation, pageId, documentType, }: DocumentConstructorProps);
    protected setField(fieldName: string, apiPrediction: StringDict, pageId: number | undefined): void;
    toString(): string;
}
