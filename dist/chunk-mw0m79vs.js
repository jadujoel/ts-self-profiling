// example.ts
async function example() {
  function callback(changes) {
    const Logs = {
      nominal: "⚪ CPU Nominal",
      fair: "\uD83D\uDFE2 CPU Fair",
      serious: "\uD83D\uDFE1 CPU Serious",
      critical: "\uD83D\uDD34 CPU Critical"
    };
    const current = changes.at(-1);
    if (current.source === "cpu") {
      console.log(`${Logs[current.state]} @ ${current.time.toFixed(0)}ms`);
    }
  }
  function observe(options = { sampleInterval: 1000 }) {
    if (typeof PressureObserver === "undefined" || !globalThis.isSecureContext) {
      return;
    }
    try {
      const observer = new PressureObserver(callback);
      observer.observe("cpu", options).catch((reason) => {
        console.trace("Failed To Set Up Pressure Observer", reason);
      });
      return observer;
    } catch (error) {
      console.trace("Failed To Set Up Pressure Observer", error);
    }
    return;
  }
  return observe();
}
