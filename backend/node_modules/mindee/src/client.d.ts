/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import { InputSource, PageOptions } from "./inputs";
import { Response, AsyncPredictResponse } from "./api";
import { Document, DocumentSig } from "./documents";
import { DocumentConfig } from "./documents/documentConfig";
type DocConfigs = Map<string[], DocumentConfig<any>>;
export interface PredictOptions {
    /**
     * For custom endpoints, the "API name" field in the "Settings" page of the API Builder.
     *
     * Do not set for standard (off the shelf) endpoints.
     */
    endpointName?: string;
    /**
     * For custom endpoints, your account or organization's username on the API Builder.
     * This is normally not required unless you have a custom endpoint which has the
     * same name as standard (off the shelf) endpoint.
     *
     * Do not set for standard (off the shelf) endpoints.
     */
    accountName?: string;
    /**
     * Whether to include the full text for each page.
     *
     * This performs a full OCR operation on the server and will increase response time.
     */
    fullText?: boolean;
    /**
     * Whether to include cropper results for each page.
     *
     * This performs a cropping operation on the server and will increase response time.
     */
    cropper?: boolean;
    /**
     * If set, remove pages from the document as specified.
     *
     * This is done before sending the file to the server and is useful to avoid page limitations.
     */
    pageOptions?: PageOptions;
}
export declare class DocumentClient {
    docConfigs: DocConfigs;
    inputSource?: InputSource;
    constructor(docConfigs: DocConfigs, inputSource?: InputSource);
    /**
     * Send a document to a synchronous endpoint and parse the predictions.
     * @param documentClass
     * @param params
     */
    parse<DocType extends Document>(documentClass: DocumentSig<DocType>, params?: PredictOptions): Promise<Response<DocType>>;
    /**
     * Send the document to an asynchronous endpoint and return its ID in the queue.
     * @param documentClass
     * @param params
     */
    enqueue<DocType extends Document>(documentClass: DocumentSig<DocType>, params?: PredictOptions): Promise<AsyncPredictResponse<DocType>>;
    parseQueued<DocType extends Document>(documentClass: DocumentSig<DocType>, queueId: string, params?: {
        endpointName?: string;
        accountName?: string;
    }): Promise<AsyncPredictResponse<DocType>>;
    protected getBooleanParam(param?: boolean): boolean;
    protected getDocConfig<DocType extends Document>(documentClass: DocumentSig<DocType>, endpointName?: string, accountName?: string): DocumentConfig<DocType>;
}
export interface CustomConfigParams {
    /** Your organization's username on the API Builder. */
    accountName: string;
    /** The "API name" field in the "Settings" page of the API Builder. */
    endpointName: string;
    /**
     * If set, locks the version of the model to use.
     * If not set, use the latest version of the model.
     */
    version?: string;
}
export interface ClientOptions {
    /** Your API key for all endpoints. */
    apiKey?: string;
    /** Raise an `Error` on errors. */
    throwOnError?: boolean;
    /** Log debug messages. */
    debug?: boolean;
}
/**
 * Mindee Client
 */
export declare class Client {
    readonly docConfigs: DocConfigs;
    protected apiKey: string;
    /**
     * @param options
     */
    constructor({ apiKey, throwOnError, debug, }: ClientOptions);
    protected addStandardEndpoints(): void;
    /**
     * Add a custom endpoint to the client.
     * @param accountName
     * @param endpointName
     * @param version
     */
    addEndpoint({ accountName, endpointName, version, }: CustomConfigParams): this;
    /**
     * Load an input document from a local path.
     * @param inputPath
     */
    docFromPath(inputPath: string): DocumentClient;
    /**
     * Load an input document from a base64 encoded string.
     * @param inputString
     * @param filename
     */
    docFromBase64(inputString: string, filename: string): DocumentClient;
    /**
     * Load an input document from a `stream.Readable` object.
     * @param inputStream
     * @param filename
     */
    docFromStream(inputStream: Readable, filename: string): DocumentClient;
    /**
     * Load an input document from a bytes string.
     * @param inputBytes
     * @param filename
     */
    docFromBytes(inputBytes: string, filename: string): DocumentClient;
    /**
     * Load an input document from a URL.
     * @param url
     */
    docFromUrl(url: string): DocumentClient;
    /**
     * Load an input document from a Buffer.
     * @param buffer
     * @param filename
     */
    docFromBuffer(buffer: Buffer, filename: string): DocumentClient;
    /**
     * Load an empty input document from an asynchronous call.
     */
    docForAsync(): DocumentClient;
}
export {};
