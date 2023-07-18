import { Document, DocumentConstructorProps } from "../document";
import { DateField, TextField } from "../../fields";
export declare class PassportV1 extends Document {
    #private;
    /** The country of issue. */
    country: TextField;
    /** The passport number. */
    idNumber: TextField;
    /** The date of birth of the passport holder. */
    birthDate: DateField;
    /** The expiration date of the passport. */
    expiryDate: DateField;
    /** The issuance date of the passport. */
    issuanceDate: DateField;
    /** The place of birth of the passport holder. */
    birthPlace: TextField;
    /** The sex or gender of the passport holder. */
    gender: TextField;
    /** The surname (last name) of the passport holder. */
    surname: TextField;
    /** The value of the first MRZ line. */
    mrz1: TextField;
    /** The value of the second MRZ line. */
    mrz2: TextField;
    /** List of first (given) names of the passport holder. */
    givenNames: TextField[];
    /** The full name of the passport holder. */
    fullName: TextField;
    /** All the MRZ values combined. */
    mrz: TextField;
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    static convertMRZDateToDatetime(dateString: string): Date;
    toString(): string;
    isExpired(): boolean;
    private isMRZValid;
    private isBirthDateValid;
    private isExpiryDateValid;
    private isIdNumberValid;
    private isSurnameValid;
    private isCountryValid;
    private constructFullName;
    private constructMRZ;
}
