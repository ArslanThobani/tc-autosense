/// <reference types="node" />
import { InputSource } from "../inputs";
import { IncomingMessage, RequestOptions, ClientRequest } from "http";
export declare const STANDARD_API_OWNER = "mindee";
export declare const API_KEY_ENVVAR_NAME = "MINDEE_API_KEY";
export declare const API_HOST_ENVVAR_NAME = "MINDEE_API_HOST";
export interface EndpointResponse {
    messageObj: IncomingMessage;
    data: {
        [key: string]: any;
    };
}
export declare class Endpoint {
    apiKey: string;
    urlName: string;
    owner: string;
    version: string;
    hostname: string;
    urlRoot: string;
    private readonly baseHeaders;
    constructor(owner: string, urlName: string, version: string, apiKey: string);
    /**
     * Make a request to POST a document for prediction.
     * @param input
     * @param includeWords
     * @param cropper
     */
    predictReqPost(input: InputSource, includeWords?: boolean, cropper?: boolean): Promise<EndpointResponse>;
    /**
     * Make a request to POST a document for async prediction.
     * @param input
     * @param includeWords
     * @param cropper
     */
    predictAsyncReqPost(input: InputSource, includeWords?: boolean, cropper?: boolean): Promise<EndpointResponse>;
    /**
     * Make a request to GET the status of a document in the queue.
     * @param queueId
     */
    documentQueueReqGet(queueId: string): Promise<EndpointResponse>;
    /**
     * Make a request to GET a document.
     * @param documentId
     */
    documentGetReq(documentId: string): Promise<EndpointResponse>;
    /**
     * Send a file to a prediction API.
     * @param input
     * @param predictUrl
     * @param includeWords
     * @param cropper
     */
    protected sendFileForPrediction(input: InputSource, predictUrl: string, includeWords?: boolean, cropper?: boolean): Promise<EndpointResponse>;
    protected readResponse(options: RequestOptions, resolve: (value: EndpointResponse | PromiseLike<EndpointResponse>) => void, reject: (reason?: any) => void): ClientRequest;
    protected apiKeyFromEnv(): string;
    protected hostnameFromEnv(): string;
}
export declare class StandardEndpoint extends Endpoint {
    constructor(endpointName: string, version: string, apiKey: string);
}
export declare class CustomEndpoint extends Endpoint {
    constructor(endpointName: string, accountName: string, version: string, apiKey: string);
}
