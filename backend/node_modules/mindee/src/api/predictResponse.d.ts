import { StringDict } from "../fields";
import { Document } from "../documents";
import { Response } from "./documentResponse";
export declare class Job {
    issuedAt: Date;
    availableAt?: Date;
    id?: string;
    status?: "waiting" | "processing" | "completed";
    /**
     * The time taken to process the job, in milliseconds.
     */
    milliSecsTaken?: number;
    constructor(jsonResponse: StringDict);
    protected datetimeWithTimezone(date: string): Date;
}
export declare class ApiRequest {
    error: StringDict;
    resources: string[];
    status: "failure" | "success";
    /** HTTP status code */
    statusCode: number;
    url: string;
    constructor(serverResponse: StringDict);
}
export declare class BasePredictResponse {
    apiRequest: ApiRequest;
    constructor(serverResponse: StringDict);
}
export declare class AsyncPredictResponse<DocType extends Document> extends BasePredictResponse {
    job: Job;
    document?: Response<DocType>;
    constructor(serverResponse: StringDict, document?: Response<DocType>);
}
