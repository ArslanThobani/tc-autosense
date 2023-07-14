"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equals = void 0;
function equals(a, b, tolerance) {
    if (Math.abs(b - a) <= tolerance) {
        return true;
    }
    if (Math.abs(a - b) <= tolerance) {
        return true;
    }
    return false;
}
exports.equals = equals;
