import { StringDict } from "../../fields";
import { Polygon } from "../../geometry";
export declare class InvoiceLineItem {
    /** The product code referring to the item. */
    productCode: string;
    /** The item description. */
    description: string;
    /** The item quantity  */
    quantity: number | null;
    /** The item unit price. */
    unitPrice: number | null;
    /** The item total amount. */
    totalAmount: number | null;
    /** The item tax rate in percentage. */
    taxRate: number | null;
    /** The item tax amount. */
    taxAmount: number | null;
    /** Confidence score */
    confidence: number;
    /** The document page on which the information was found. */
    pageId: number;
    /**
     * Contains the relative vertices coordinates (points) of a polygon containing
     * the field in the document.
     */
    polygon: Polygon;
    constructor({ prediction }: StringDict);
    toString(): string;
}
