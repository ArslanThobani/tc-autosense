"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reconstructTotalIncl = exports.reconstructTotalExcl = exports.reconstructTotalTaxFromTotals = exports.reconstructTotalTax = void 0;
const fields_1 = require("../../fields");
function reconstructTotalTax(document) {
    if (document.taxes.length > 0) {
        const totalTax = {
            value: document.taxes.reduce((acc, tax) => {
                return tax.value !== undefined ? acc + tax.value : acc;
            }, 0),
            confidence: fields_1.TextField.arrayConfidence(document.taxes),
        };
        if (totalTax.value > 0)
            document.totalTax = new fields_1.Amount({
                prediction: totalTax,
                valueKey: "value",
                reconstructed: true,
            });
    }
}
exports.reconstructTotalTax = reconstructTotalTax;
function reconstructTotalTaxFromTotals(document) {
    if (document.totalTax.value !== undefined ||
        document.totalNet.value === undefined ||
        document.totalAmount.value === undefined) {
        return;
    }
    const totalTax = {
        value: document.totalAmount.value - document.totalNet.value,
        confidence: document.totalAmount.confidence * document.totalNet.confidence,
    };
    if (totalTax.value >= 0) {
        document.totalTax = new fields_1.Amount({
            prediction: totalTax,
            valueKey: "value",
            reconstructed: true,
        });
    }
}
exports.reconstructTotalTaxFromTotals = reconstructTotalTaxFromTotals;
function reconstructTotalExcl(document) {
    if (document.totalAmount.value === undefined ||
        document.taxes.length === 0 ||
        document.totalNet.value !== undefined) {
        return;
    }
    const totalExcl = {
        value: document.totalAmount.value - fields_1.TextField.arraySum(document.taxes),
        confidence: fields_1.TextField.arrayConfidence(document.taxes) *
            document.totalAmount.confidence,
    };
    document.totalNet = new fields_1.Amount({
        prediction: totalExcl,
        valueKey: "value",
        reconstructed: true,
    });
}
exports.reconstructTotalExcl = reconstructTotalExcl;
function reconstructTotalIncl(document) {
    if (!(document.totalNet.value === undefined ||
        document.taxes.length === 0 ||
        document.totalAmount.value !== undefined)) {
        const totalIncl = {
            value: document.totalNet.value +
                document.taxes.reduce((acc, tax) => {
                    return tax.value ? acc + tax.value : acc;
                }, 0.0),
            confidence: fields_1.TextField.arrayConfidence(document.taxes) *
                document.totalNet.confidence,
        };
        document.totalAmount = new fields_1.Amount({
            prediction: totalIncl,
            valueKey: "value",
            reconstructed: true,
        });
    }
}
exports.reconstructTotalIncl = reconstructTotalIncl;
