import { InvoiceV3 } from "./invoiceV3";
import { InvoiceV4 } from "./invoiceV4";
export declare function reconstructTotalTax(document: InvoiceV3 | InvoiceV4): void;
export declare function reconstructTotalTaxFromTotals(document: InvoiceV3 | InvoiceV4): void;
export declare function reconstructTotalExcl(document: InvoiceV3 | InvoiceV4): void;
export declare function reconstructTotalIncl(document: InvoiceV3 | InvoiceV4): void;
