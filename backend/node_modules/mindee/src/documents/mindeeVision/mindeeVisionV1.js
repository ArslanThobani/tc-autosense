"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindeeVisionV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
class MindeeVisionV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            fullText: fullText,
            extras: extras,
        });
        /** List of words found on the page. */
        this.allWords = [];
        if (prediction.all_words !== undefined) {
            prediction.all_words.map((prediction) => {
                this.allWords.push(prediction);
            });
        }
    }
    toString() {
        const fullText = new fields_1.FullText();
        fullText.words = this.allWords;
        return fullText.toString();
    }
}
exports.MindeeVisionV1 = MindeeVisionV1;
