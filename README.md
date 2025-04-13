# ts-self-profiling

```typescript
// make sure we have the types
import "ts-self-profiling"

async function main() {
  const profiler = new Profiler({
    sampleInterval: 100, // microseconds
    maxBufferSize: 100_000,
  });
  work();
  const trace = await profiler.stop();
  console.log('Profile collected:', trace);
  function work() {
    let result = 0;
    for (let i = 0; i < 10_000_000; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    console.log('Finished CPU work:', result);
  }
}
```
