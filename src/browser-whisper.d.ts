/**
 * Transcriber.ts — Public API
 *
 * Usage:
 *   const transcriber = new BrowserWhisper({ model: 'whisper-base', language: 'en' })
 *
 *   // Async-iterable style:
 *   for await (const segment of transcriber.transcribe(file)) {
 *     console.log(segment.text)
 *   }
 *
 *   // Collect everything at once:
 *   const segments = await transcriber.transcribe(file).collect()
 *
 *   // Callback style (works simultaneously with iteration):
 *   transcriber.transcribe(file, { onSegment: (s) => appendToUI(s) })
 */
import type { TranscriptSegment, TranscribeOptions } from './types.js';
/**
 * The core entry point for the browser-whisper library.
 * It manages the lifecycle of the Web Workers and exposes a simple API
 * for transcribing audio files directly in the browser via WebGPU and WebCodecs.
 */
export declare class BrowserWhisper {
    private readonly defaultOptions;
    /**
     * @param options Global options to apply to all transcriptions instantiated by this class.
     */
    constructor(options?: TranscribeOptions);
    /**
     * Starts transcribing a given audio or video File.
     *
     * Internally, this boots up two Web Workers:
     * 1. A Decoder Worker (using WebCodecs/MediaBunny to decode the file)
     * 2. An ASR Worker (using Transformers.js/WebGPU to run inference)
     *
     * The workers communicate with each other via a zero-copy MessageChannel,
     * entirely bypassing the main UI thread to prevent blocking.
     *
     * @param file The audio or video file to transcribe.
     * @param runtimeOptions Options that merge with and override the constructor options for this specific file.
     * @returns A TranscribeStream that implements AsyncIterable, allowing for `for await` loops.
     */
    transcribe(file: File, runtimeOptions?: TranscribeOptions): TranscribeStream;
}
/**
 * A stream representing an active transcription process.
 *
 * It implements `AsyncIterable<TranscriptSegment>`, meaning you can iterate over
 * it using a `for await (const segment of stream)` loop. The loop will suspend
 * natively while waiting for the GPU to emit the next chunk of text.
 *
 * Alternatively, it accepts standard event callbacks via its constructor options.
 */
export declare class TranscribeStream implements AsyncIterable<TranscriptSegment> {
    private readonly file;
    private readonly options;
    private readonly queue;
    private doneFlag;
    private error;
    private notify;
    private bridge;
    constructor(file: File, options?: TranscribeOptions);
    [Symbol.asyncIterator](): AsyncGenerator<TranscriptSegment>;
    /**
     * Collect all segments into an array.
     * Convenient alternative to `for await`.
     *
     * @example
     * const segments = await transcriber.transcribe(file).collect()
     */
    collect(): Promise<TranscriptSegment[]>;
    /**
     * Cancel the transcription and terminate the underlying workers.
     */
    cancel(): void;
    private startBridge;
    /** Resolve the pending Promise inside the async iterator */
    private wakeUp;
}
