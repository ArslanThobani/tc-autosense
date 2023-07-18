"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountDetailsV1 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
/** French bank account information (RIB) */
class BankAccountDetailsV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        this.iban = new fields_1.TextField({
            prediction: prediction.iban,
            pageId: pageId,
        });
        this.accountHolderName = new fields_1.TextField({
            prediction: prediction.account_holder_name,
            pageId: pageId,
        });
        this.swift = new fields_1.TextField({
            prediction: prediction.swift,
            pageId: pageId,
        });
    }
    toString() {
        const outStr = `----- FR Bank Account Details V1 -----
Filename: ${this.filename}
IBAN: ${this.iban}
Account Holder's Name: ${this.accountHolderName}
SWIFT Code: ${this.swift}
----------------------
`;
        return BankAccountDetailsV1.cleanOutString(outStr);
    }
}
exports.BankAccountDetailsV1 = BankAccountDetailsV1;
