"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdCardV1 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
class IdCardV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        /** The list of the names of the person. */
        this.givenNames = [];
        this.authority = new fields_1.TextField({
            prediction: prediction.authority,
            pageId: pageId,
        });
        this.documentSide = new fields_1.BaseField({
            prediction: prediction.document_side,
        });
        this.idNumber = new fields_1.TextField({
            prediction: prediction.id_number,
            pageId: pageId,
        });
        this.birthDate = new fields_1.DateField({
            prediction: prediction.birth_date,
            pageId: pageId,
        });
        this.expiryDate = new fields_1.DateField({
            prediction: prediction.expiry_date,
            pageId: pageId,
        });
        this.birthPlace = new fields_1.TextField({
            prediction: prediction.birth_place,
            pageId: pageId,
        });
        this.gender = new fields_1.TextField({
            prediction: prediction.gender,
            pageId: pageId,
        });
        this.surname = new fields_1.TextField({
            prediction: prediction.surname,
            pageId: pageId,
        });
        this.mrz1 = new fields_1.TextField({
            prediction: prediction.mrz1,
            pageId: pageId,
        });
        this.mrz2 = new fields_1.TextField({
            prediction: prediction.mrz2,
            pageId: pageId,
        });
        prediction.given_names.map((prediction) => this.givenNames.push(new fields_1.TextField({
            prediction: prediction,
            pageId: pageId,
        })));
    }
    toString() {
        const outStr = `----- FR Carte Nationale d'Identité V1 -----
Filename: ${this.filename}
Document Side: ${this.documentSide}
Identity Number: ${this.idNumber}
Given Name(s): ${this.givenNames.map((name) => name.value).join(" ")}
Surname: ${this.surname}
Date of Birth: ${this.birthDate}
Place of Birth: ${this.birthPlace}
Expiry Date: ${this.expiryDate}
Issuing Authority: ${this.authority}
Gender: ${this.gender}
MRZ Line 1: ${this.mrz1}
MRZ Line 2: ${this.mrz2}
----------------------
`;
        return IdCardV1.cleanOutString(outStr);
    }
}
exports.IdCardV1 = IdCardV1;
