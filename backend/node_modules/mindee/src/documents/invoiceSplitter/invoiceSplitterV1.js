"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSplitterV1 = exports.PageGroup = void 0;
const document_1 = require("../document");
class PageGroup {
    constructor(prediction) {
        this.pageIndexes = [];
        this.pageIndexes = prediction.page_indexes;
        this.confidence = prediction.confidence;
    }
    toString() {
        return `page indexes: ${this.pageIndexes.join(", ")}`;
    }
}
exports.PageGroup = PageGroup;
class InvoiceSplitterV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            fullText: fullText,
            extras: extras,
        });
        /** List of page indexes that belong to the same invoice in the PDF. */
        this.invoicePageGroups = [];
        if (prediction.invoice_page_groups !== undefined) {
            prediction.invoice_page_groups.map((prediction) => this.invoicePageGroups.push(new PageGroup(prediction)));
        }
    }
    toString() {
        let invoicePageGroups = "\n";
        if (this.invoicePageGroups.length > 0) {
            invoicePageGroups = "\n  ";
            invoicePageGroups += this.invoicePageGroups
                .map((item) => item.toString())
                .join("\n  ");
        }
        const outStr = `----- Invoice Splitter V1 -----
Filename: ${this.filename}
Invoice Page Groups: ${invoicePageGroups}
----------------------
`;
        return InvoiceSplitterV1.cleanOutString(outStr);
    }
}
exports.InvoiceSplitterV1 = InvoiceSplitterV1;
