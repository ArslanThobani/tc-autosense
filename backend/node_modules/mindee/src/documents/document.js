"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const fields_1 = require("../fields");
class Document {
    constructor({ orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, documentType, }) {
        this.filename = "";
        this.cropper = [];
        this.filepath = undefined;
        this.pageId = pageId;
        if (documentType === undefined || documentType === "") {
            this.docType = Object.getPrototypeOf(this).constructor.name;
        }
        else {
            this.docType = documentType;
        }
        if (pageId !== undefined && orientation !== undefined) {
            this.orientation = new fields_1.OrientationField({
                prediction: orientation,
                pageId: pageId,
            });
        }
        if (extras !== undefined) {
            if (extras.cropper !== undefined) {
                extras.cropper.cropping.forEach((crop) => {
                    this.cropper.push(new fields_1.PositionField({
                        prediction: crop,
                        pageId: pageId,
                    }));
                });
            }
        }
        if (inputSource !== undefined) {
            this.filepath = inputSource.filepath;
            this.filename = inputSource.filename;
            this.mimeType = inputSource.mimeType;
        }
        this.fullText = fullText;
        this.checklist = {};
    }
    clone() {
        return JSON.parse(JSON.stringify(this));
    }
    /** return true if all checklist of the document if true */
    checkAll() {
        return Object.values(this.checklist).every((item) => item);
    }
    /**
     * Takes a list of Documents and return one Document where
     * each field is set with the maximum probability field
     * @param {Array<Document>} documents - A list of Documents
     */
    static mergePages(documents) {
        const finalDocument = documents[0].clone();
        const attributes = Object.getOwnPropertyNames(finalDocument);
        for (const document of documents) {
            for (const attribute of attributes) {
                if (Array.isArray(document?.[attribute])) {
                    finalDocument[attribute] = finalDocument[attribute]?.length
                        ? finalDocument[attribute]
                        : document?.[attribute];
                }
                else if (document?.[attribute]?.confidence >
                    finalDocument[attribute].confidence) {
                    finalDocument[attribute] = document?.[attribute];
                }
            }
        }
        return finalDocument;
    }
    static cleanOutString(outStr) {
        const lines = / \n/gm;
        return outStr.replace(lines, "\n");
    }
}
exports.Document = Document;
