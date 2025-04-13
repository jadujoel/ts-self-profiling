// example.ts
async function runSelfProfiling() {
  if (!("Profiler" in window)) {
    console.warn("Self-Profiling API not supported in this browser.");
    return;
  }
  const controller = new AbortController;
  console.log("Starting profiler...");
  const profiler = new Profiler({
    sampleInterval: 100,
    maxBufferSize: 1e5
  });
  function doWork() {
    let result = 0;
    for (let i = 0;i < 1e7; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    console.log("Finished CPU work:", result);
  }
  doWork();
  const trace = await profiler.stop();
  console.log("Profile collected:", trace);
}
runSelfProfiling();
