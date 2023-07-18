"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceLineItem = void 0;
const amount_1 = require("../../fields/amount");
class InvoiceLineItem {
    constructor({ prediction }) {
        /** Confidence score */
        this.confidence = 0.0;
        /**
         * Contains the relative vertices coordinates (points) of a polygon containing
         * the field in the document.
         */
        this.polygon = [];
        this.productCode = prediction.product_code;
        this.description = prediction.description;
        this.quantity = +parseFloat(prediction.quantity).toFixed(3);
        if (isNaN(this.quantity)) {
            this.quantity = null;
        }
        this.unitPrice = +parseFloat(prediction.unit_price).toFixed(3);
        if (isNaN(this.unitPrice)) {
            this.unitPrice = null;
        }
        this.totalAmount = +parseFloat(prediction.total_amount).toFixed(3);
        if (isNaN(this.totalAmount)) {
            this.totalAmount = null;
        }
        this.taxRate = +parseFloat(prediction.tax_rate).toFixed(3);
        if (isNaN(this.taxRate)) {
            this.taxRate = null;
        }
        this.taxAmount = +parseFloat(prediction.tax_amount).toFixed(3);
        if (isNaN(this.taxAmount)) {
            this.taxAmount = null;
        }
        this.pageId = prediction.page_id;
        this.confidence = prediction.confidence ? prediction.confidence : 0.0;
        if (prediction.polygon) {
            this.polygon = prediction.polygon;
        }
    }
    toString() {
        const productCode = this.productCode ?? "";
        const quantity = this.quantity !== null ? (0, amount_1.floatToString)(this.quantity) : "";
        const unitPrice = this.unitPrice !== null ? (0, amount_1.floatToString)(this.unitPrice) : "";
        const totalAmount = this.totalAmount !== null ? (0, amount_1.floatToString)(this.totalAmount) : "";
        let tax = this.taxAmount !== null ? (0, amount_1.floatToString)(this.taxAmount) : "";
        tax += this.taxRate !== null ? ` (${(0, amount_1.floatToString)(this.taxRate)}%)` : "";
        let description = this.description ?? "";
        if (description.length > 32) {
            description = this.description.substring(0, 32) + "...";
        }
        return (productCode.padEnd(14) +
            " | " +
            quantity.padEnd(6) +
            " | " +
            unitPrice.padEnd(7) +
            " | " +
            totalAmount.padEnd(8) +
            " | " +
            tax.padEnd(16) +
            " | " +
            description);
    }
}
exports.InvoiceLineItem = InvoiceLineItem;
