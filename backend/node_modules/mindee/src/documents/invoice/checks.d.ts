import { InvoiceV3 } from "./invoiceV3";
import { InvoiceV4 } from "./invoiceV4";
export declare function taxesMatchTotalIncl(document: InvoiceV4 | InvoiceV3): boolean;
export declare function taxesMatchTotalExcl(document: InvoiceV4 | InvoiceV3): boolean;
export declare function taxesAndTotalExclMatchTotalIncl(document: InvoiceV4 | InvoiceV3): boolean;
