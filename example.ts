
async function main() {
  const profiler = new Profiler({
    sampleInterval: 100, // microseconds
    maxBufferSize: 100_000,
  });
  work();
  const trace = await profiler.stop();
  console.log('Profile collected:', trace);

  /**
   * @example
   * [
   *   {column: 32, line: 2, name: 'runSelfProfiling', resourceId: 0},
   *   {column: 1, line: 1, name: '', resourceId: 0},
   *   {column: 18, line: 12, name: 'doWork', resourceId: 0},
   * ]
  **/
  const frames = trace.frames

  for (const frame of trace.frames) {
    frame.name
  }
  /**
   * @example
   * [
   *   "http://localhost:3000/chunk-qhth1k6g.js"
   * ]
  **/
  const resources = trace.resources

  /**
   * @example
   * [
   *   {stackId: 1, timestamp: 39.94499969482422}
   *   {stackId: 2, timestamp: 41.69499969482422}
   *   {stackId: 2, timestamp: 142.98499965667725}
   *   {stackId: 2, timestamp: 183.85999965667725}
   * ]
  **/
  const samples = trace.samples

  /**
   * @example
   * [
   *   {frameId: 1}
   *   {frameId: 0, parentId: 0}
   *   {frameId: 2, parentId: 1}
   * ]
   */
  const stacks = trace.stacks


  // console.log('Top function names from samples:', topFunctions);
}

function work() {
  let result = 0;
  for (let i = 0; i < 10_000_000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  console.log('Finished CPU work:', result);
}

main();
