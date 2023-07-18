import { Document, DocumentConstructorProps } from "../document";
import { TaxField, TextField, Amount, Locale, DateField as Date, CompanyRegistration } from "../../fields";
/**
 * @deprecated You should use FinancialDocumentV1 instead.
 */
export declare class FinancialDocumentV0 extends Document {
    #private;
    pageId: number | undefined;
    locale: Locale;
    totalIncl: Amount;
    date: Date;
    dueDate: Date;
    category: TextField;
    time: TextField;
    taxes: TaxField[];
    totalTax: Amount;
    totalExcl: Amount;
    supplier: TextField;
    supplierAddress: TextField;
    invoiceNumber: TextField;
    companyRegistration: CompanyRegistration[];
    customerName: TextField;
    customerAddress: TextField;
    paymentDetails: TextField[];
    customerCompanyRegistration: CompanyRegistration[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
