"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("./fields");
class CustomV1 extends document_1.Document {
    constructor({ inputSource, prediction, extras = undefined, orientation = undefined, pageId, documentType, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            documentType: documentType,
        });
        this.fields = new Map();
        this.classifications = new Map();
        Object.keys(prediction).forEach((fieldName) => {
            this.setField(fieldName, prediction, pageId);
        });
    }
    setField(fieldName, apiPrediction, pageId) {
        // Currently, two types of fields possible in a custom API response:
        // fields having a list of values, and classification fields.
        const fieldPrediction = apiPrediction[fieldName];
        if (fieldPrediction["values"] !== undefined) {
            // Only value lists have the 'values' attribute.
            this.fields.set(fieldName, new fields_1.ListField({
                prediction: fieldPrediction,
                pageId: pageId,
            }));
        }
        else if (fieldPrediction["value"] !== undefined) {
            // Only classifications have the 'value' attribute.
            this.classifications.set(fieldName, new fields_1.ClassificationField({ prediction: fieldPrediction }));
        }
        else {
            throw "Unknown API field type";
        }
    }
    toString() {
        let outStr = `----- ${this.docType} -----`;
        outStr += `\nFilename: ${this.filename}`.trimEnd();
        this.classifications.forEach((fieldData, name) => {
            outStr += `\n${name}: ${fieldData}`.trimEnd();
        });
        this.fields.forEach((fieldData, name) => {
            outStr += `\n${name}: ${fieldData}`.trimEnd();
        });
        outStr += "\n----------------------\n";
        return outStr;
    }
}
exports.CustomV1 = CustomV1;
