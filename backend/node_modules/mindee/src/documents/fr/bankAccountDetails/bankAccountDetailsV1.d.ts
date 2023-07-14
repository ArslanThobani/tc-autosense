import { Document, DocumentConstructorProps } from "../../document";
import { TextField } from "../../../fields";
/** French bank account information (RIB) */
export declare class BankAccountDetailsV1 extends Document {
    /** The account's IBAN. */
    iban: TextField;
    /** The account holder's name. */
    accountHolderName: TextField;
    /** The bank's SWIFT code. */
    swift: TextField;
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
