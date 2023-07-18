"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarteVitaleV1 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
class CarteVitaleV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        /** List of given (first) names of the cardholder. */
        this.givenNames = [];
        this.socialSecurity = new fields_1.TextField({
            prediction: prediction.social_security,
            pageId: pageId,
        });
        this.issuanceDate = new fields_1.DateField({
            prediction: prediction.issuance_date,
            pageId: pageId,
        });
        this.surname = new fields_1.TextField({
            prediction: prediction.surname,
            pageId: pageId,
        });
        prediction.given_names.map((prediction) => this.givenNames.push(new fields_1.TextField({
            prediction: prediction,
            pageId: pageId,
        })));
    }
    toString() {
        const outStr = `----- FR Carte Vitale V1 -----
Filename: ${this.filename}
Given Name(s): ${this.givenNames.map((name) => name.value).join(" ")}
Surname: ${this.surname}
Social Security Number: ${this.socialSecurity}
Issuance Date: ${this.issuanceDate}
----------------------
`;
        return CarteVitaleV1.cleanOutString(outStr);
    }
}
exports.CarteVitaleV1 = CarteVitaleV1;
