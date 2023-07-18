import { Document, DocumentConstructorProps } from "../../document";
import { TextField, DateField } from "../../../fields";
export declare class CarteVitaleV1 extends Document {
    /** List of given (first) names of the cardholder. */
    givenNames: TextField[];
    /** The surname of the person. */
    surname: TextField;
    /** The social security number of the cardholder. */
    socialSecurity: TextField;
    /** The issuance date of the card. */
    issuanceDate: DateField;
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
