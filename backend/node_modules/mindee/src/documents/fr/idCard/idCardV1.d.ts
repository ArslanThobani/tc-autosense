import { Document, DocumentConstructorProps } from "../../document";
import { TextField, DateField, BaseField } from "../../../fields";
export declare class IdCardV1 extends Document {
    /** The authority which has issued the card. */
    authority: TextField;
    /** Indicates if it is the recto side, the verso side or both. */
    documentSide: BaseField;
    /** The id number of the card. */
    idNumber: TextField;
    /** The birth date of the person. */
    birthDate: DateField;
    /** The expiry date of the card. */
    expiryDate: DateField;
    /** The birth place of the person. */
    birthPlace: TextField;
    /** The gender of the person. */
    gender: TextField;
    /** The first mrz value. */
    mrz1: TextField;
    /** The second mrz value. */
    mrz2: TextField;
    /** The surname of the person. */
    surname: TextField;
    /** The list of the names of the person. */
    givenNames: TextField[];
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
