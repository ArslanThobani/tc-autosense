/// <reference types="node" />
/// <reference types="node" />
import { Readable } from "stream";
import { Buffer } from "buffer";
import { InputSource } from "./base";
interface PathInputProps {
    inputPath: string;
}
export declare class PathInput extends InputSource {
    readonly inputPath: string;
    fileObject: Buffer;
    constructor({ inputPath }: PathInputProps);
    init(): Promise<void>;
}
interface Base64InputProps {
    inputString: string;
    filename: string;
}
export declare class Base64Input extends InputSource {
    private inputString;
    fileObject: Buffer;
    constructor({ inputString, filename }: Base64InputProps);
    init(): Promise<void>;
}
interface StreamInputProps {
    inputStream: Readable;
    filename: string;
}
export declare class StreamInput extends InputSource {
    private readonly inputStream;
    fileObject: Buffer;
    constructor({ inputStream, filename }: StreamInputProps);
    init(): Promise<void>;
    stream2buffer(stream: Readable): Promise<Buffer>;
}
interface BytesInputProps {
    inputBytes: string;
    filename: string;
}
export declare class BytesInput extends InputSource {
    private inputBytes;
    fileObject: Buffer;
    constructor({ inputBytes, filename }: BytesInputProps);
    init(): Promise<void>;
}
interface UrlInputProps {
    url: string;
}
export declare class UrlInput extends InputSource {
    private readonly url;
    fileObject: string;
    constructor({ url }: UrlInputProps);
    init(): Promise<void>;
}
interface BufferInputProps {
    buffer: Buffer;
    filename: string;
}
export declare class BufferInput extends InputSource {
    constructor({ buffer, filename }: BufferInputProps);
    init(): Promise<void>;
}
export {};
