"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicensePlateV1 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
class LicensePlateV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        /** A list of license plates. */
        this.licensePlates = [];
        prediction.license_plates.map((prediction) => this.licensePlates.push(new fields_1.TextField({
            prediction: prediction,
            pageId: pageId,
        })));
    }
    toString() {
        const outStr = `----- EU License Plate V1 -----
Filename: ${this.filename}
License Plates: ${this.licensePlates
            .map((plate) => plate.value)
            .join("\n                ")}
----------------------
`;
        return LicensePlateV1.cleanOutString(outStr);
    }
}
exports.LicensePlateV1 = LicensePlateV1;
