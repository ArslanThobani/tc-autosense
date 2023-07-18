"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const fields_1 = require("../fields");
/**
 * Base class for all responses.
 */
class Response {
    constructor(documentClass, params) {
        this.pages = [];
        this.documentClass = documentClass;
        this.httpResponse = params.httpResponse;
        this.inputFile = params.input;
        if (!params.error) {
            this.formatResponse(params.documentType);
        }
    }
    formatResponse(documentType) {
        const httpDataDocument = this.httpResponse.data.document;
        httpDataDocument.inference.pages.forEach((apiPage) => {
            const pageText = this.getPageText(httpDataDocument, apiPage.id);
            this.pages.push(new this.documentClass({
                documentType: documentType,
                prediction: apiPage.prediction,
                inputSource: this.inputFile,
                pageId: apiPage.id,
                orientation: apiPage.orientation,
                extras: apiPage.extras,
                fullText: pageText,
            }));
        });
        this.document = new this.documentClass({
            documentType: documentType,
            prediction: httpDataDocument.inference.prediction,
            inputSource: this.inputFile,
            orientation: {},
            extras: {},
        });
    }
    getPageText(httpDataDocument, pageId) {
        const pageText = new fields_1.FullText();
        if ("ocr" in httpDataDocument &&
            Object.keys(httpDataDocument.ocr).length > 0) {
            pageText.words =
                httpDataDocument.ocr["mvision-v1"].pages[pageId].all_words;
        }
        return pageText;
    }
}
exports.Response = Response;
