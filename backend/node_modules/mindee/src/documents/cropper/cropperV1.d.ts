import { Document, DocumentConstructorProps } from "../document";
import { PositionField } from "../../fields";
export declare class CropperV1 extends Document {
    cropping: PositionField[];
    constructor({ prediction, orientation, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
