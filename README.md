# ts-pressure-observer

```typescript
// make sure we have the types
import "ts-pressure-observer"

export async function example(): Promise<PressureObserver | undefined> {
  /**
   * the callback only gets invoked when the pressure changes from one value to the other
   */
  function callback(changes: readonly PressureRecord[]): void {
    const Logs = {
      nominal: "⚪ CPU Nominal",
      fair: "🟢 CPU Fair",
      serious: "🟡 CPU Serious",
      critical: "🔴 CPU Critical",
    } as const satisfies Record<PressureRecordState, string>

    const current = changes.at(-1)!;
    if (current.source === "cpu") {
      console.log(`${Logs[current.state]} @ ${current.time.toFixed(0)}ms`)
    }
  }

  function observe(options: PressureObserveOptions = { sampleInterval: 1000 }): PressureObserver | undefined {
    if (typeof PressureObserver === "undefined" || !(globalThis as { isSecureContext?: boolean }).isSecureContext) {
      return undefined
    }
    try {
      const observer = new PressureObserver(callback)
      observer.observe("cpu", options).catch(reason => {
        console.trace("Failed To Set Up Pressure Observer", reason)
      })
      return observer
    } catch (error) {
      console.trace("Failed To Set Up Pressure Observer", error)
    }
    return undefined
  }

  return observe()
}

if (import.meta.main) {
  example()
}
```
