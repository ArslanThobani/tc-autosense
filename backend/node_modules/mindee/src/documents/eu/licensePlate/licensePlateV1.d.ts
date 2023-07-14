import { Document, DocumentConstructorProps } from "../../document";
import { TextField } from "../../../fields";
export declare class LicensePlateV1 extends Document {
    /** A list of license plates. */
    licensePlates: TextField[];
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
