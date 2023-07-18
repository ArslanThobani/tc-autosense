"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncPredictResponse = exports.BasePredictResponse = exports.ApiRequest = exports.Job = void 0;
class Job {
    constructor(jsonResponse) {
        this.issuedAt = this.datetimeWithTimezone(jsonResponse["issued_at"]);
        if (jsonResponse["available_at"] !== undefined &&
            jsonResponse["available_at"] !== null) {
            this.availableAt = this.datetimeWithTimezone(jsonResponse["available_at"]);
        }
        this.id = jsonResponse["id"];
        this.status = jsonResponse["status"];
        if (this.availableAt !== undefined) {
            this.milliSecsTaken =
                this.availableAt.getTime() - this.issuedAt.getTime();
        }
    }
    // Hideous thing to make sure dates sent back by the server are parsed correctly in UTC.
    datetimeWithTimezone(date) {
        if (date.search(/\+[0-9]{2}:[0-9]{2}$/) === -1) {
            date += "+00:00";
        }
        return new Date(date);
    }
}
exports.Job = Job;
class ApiRequest {
    constructor(serverResponse) {
        this.error = serverResponse["error"];
        this.resources = serverResponse["resources"];
        this.status = serverResponse["status"];
        this.statusCode = serverResponse["status_code"];
        this.url = serverResponse["url"];
    }
}
exports.ApiRequest = ApiRequest;
// For upcoming v4, use this as the base for all responses.
// To not break compatibility, in v3.x, we will only use it as the base for async responses.
class BasePredictResponse {
    constructor(serverResponse) {
        this.apiRequest = new ApiRequest(serverResponse["api_request"]);
    }
}
exports.BasePredictResponse = BasePredictResponse;
class AsyncPredictResponse extends BasePredictResponse {
    constructor(serverResponse, document) {
        super(serverResponse);
        this.job = new Job(serverResponse["job"]);
        this.document = document;
    }
}
exports.AsyncPredictResponse = AsyncPredictResponse;
