import { Document, DocumentConstructorProps } from "../document";
import { ClassificationField, Amount, DateField, TextField, Locale, TaxField } from "../../fields";
export declare class ReceiptV4 extends Document {
    /** Where the purchase was made, the language, and the currency. */
    locale: Locale;
    /** The purchase date. */
    date: DateField;
    /** The receipt category among predefined classes. */
    category: ClassificationField;
    /** The receipt sub-category among predefined classes. */
    subCategory: ClassificationField;
    /** Whether the document is an expense receipt or a credit card receipt. */
    documentType: TextField;
    /** The name of the supplier or merchant, as seen on the receipt. */
    supplier: TextField;
    /** Time as seen on the receipt in HH:MM format. */
    time: TextField;
    /** List of taxes detected on the receipt. */
    taxes: TaxField[];
    /** Total amount of tip and gratuity. */
    tip: Amount;
    /** total spent including taxes, discounts, fees, tips, and gratuity. */
    totalAmount: Amount;
    /** Total amount of the purchase excluding taxes. */
    totalNet: Amount;
    /** Total tax amount of the purchase. */
    totalTax: Amount;
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
