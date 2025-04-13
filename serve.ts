// import home from "./index.html"
import { build } from "./build"

export async function serve() {
  const server = Bun.serve({
    async fetch(req) {
      await build()
      const url = new URL(req.url)
      const pathname = url.pathname.endsWith("/") ? `${url.pathname}index.html` : url.pathname
      const x = `dist${pathname}`
      const file = Bun.file(x)
      if (!file.exists()) {
        return new Response(404)
      }
      const headers = new Headers()
      headers.set("Document-Policy", "js-profiling")
      const response = new Response(file, { headers })
      return response
    }
  })

  console.log(server.url.href)
}

if (import.meta.main) {
  await serve()
}
