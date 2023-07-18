import { Document, DocumentConstructorProps } from "../../document";
import { TextField, DateField, PositionField, Amount } from "../../../fields";
export declare class BankCheckV1 extends Document {
    /** Payer's bank account number. */
    accountNumber: TextField;
    /** Amount to be paid. */
    amount: Amount;
    /** The check number. */
    checkNumber: TextField;
    /** Check's position in the image. */
    checkPosition: PositionField;
    /** Date the check was issued. */
    issuanceDate: DateField;
    /** List of payees (full name or company name). */
    payees: TextField[];
    /** Payer's bank account routing number. */
    routingNumber: TextField;
    /** The positions of the signatures on the image. */
    signaturesPositions: PositionField;
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
