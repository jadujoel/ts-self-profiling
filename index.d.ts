
/**
 * https://wicg.github.io/js-self-profiling/#the-profilertrace-dictionary
 * @note Note
 * Inspired by the V8 trace event format and Gecko profile format, this representation is designed to be easily and efficiently serializable.
 */
interface ProfilerTrace {
  readonly resources: readonly ProfilerResource[]
  readonly frames: readonly ProfilerFrame[]
  readonly stacks: readonly ProfilerStack[]
  readonly samples: readonly ProfilerSample[]
}

// https://wicg.github.io/js-self-profiling/#the-profilersample-dictionary
interface ProfilerSample {
  readonly timestamp: DOMHighResTimeStamp
  readonly stackId?: number
}

// https://wicg.github.io/js-self-profiling/#the-profilerstack-dictionary
interface ProfilerStack {
  readonly parentId?: number
  readonly frameId: number
};

// https://wicg.github.io/js-self-profiling/#the-profilerframe-dictionary
interface ProfilerFrame {
  readonly name: string
  readonly resourceId?: number
  readonly line?: number
  readonly column?: number
};

// https://wicg.github.io/js-self-profiling/#the-profilerinitoptions-dictionary
interface ProfilerInitOptions {
  /**
   * sampleInterval is the application's desired sample interval.
   * This value MUST be greater than or equal to zero.
   */
  readonly sampleInterval: DOMHighResTimeStamp
  /**
   * maxBufferSize is the desired sample buffer size limit, in samples.
   */
  readonly maxBufferSize: number
}

declare class Profiler extends EventTarget {
  constructor(options: ProfilerInitOptions);
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Profiler/stop
   * https://wicg.github.io/js-self-profiling/#dom-profiler-stop
   *
   * Stops the profiler and returns a trace. This method MUST run these steps:
   * If the associated profiling session's state is stopped, return a promise rejected with an "InvalidStateError" DOMException.
   * Set the profiling session's state to stopped.
   * Let p be a new promise.
   * Run the following steps in parallel:
   * Perform any implementation-defined work to stop the profiling session.
   * Resolve p with the ProfilerTrace associated with the profiler's profiling session.
   * Return p.
   * Any samples taken after stop() is invoked SHOULD NOT be included by the profiling session.
   * If the associated profiling session's state is stopped, return a promise rejected with an "InvalidStateError" DOMException.
   *
   * @example ```ts
   * const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 10000 });
   * doWork();
   *
   * const profile = await profiler.stop();
   * console.log(JSON.stringify(profile))
   * ```
   */
  async stop(): Promise<ProfilerTrace | never>
  readonly stopped: boolean
  readonly sampleInterval: DOMHighResTimeStamp
}
