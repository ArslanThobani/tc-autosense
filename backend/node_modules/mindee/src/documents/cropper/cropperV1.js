"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropperV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
class CropperV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
        });
        this.cropping = [];
        if (pageId !== undefined) {
            prediction.cropping.forEach((crop) => {
                this.cropping.push(new fields_1.PositionField({
                    prediction: crop,
                    pageId: pageId,
                }));
            });
        }
    }
    toString() {
        const cropping = this.cropping
            .map((crop) => crop.toString())
            .join("\n          ");
        const outStr = `----- Cropper Data -----
Filename: ${this.filename}
Cropping: ${cropping}
------------------------
`;
        return CropperV1.cleanOutString(outStr);
    }
}
exports.CropperV1 = CropperV1;
