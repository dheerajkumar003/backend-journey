import http from "node:http"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { compareVersions } from "./lib/version.js"
import { sendJson } from "./lib/http.js"

const PORT = Number(process.env.PORT) || 3000
const CONFIG_PATH = path.join(import.meta.dirname, "config.json")
const PLATFORMS = ["ios", "android"]
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/   // "1.2.0" ✅  "1.2" ❌  "abc" ❌

const server = http.createServer(async (req, res) => {
     const start = Date.now()
    res.on("finish", ()=> {
        const ms = Date.now() - start
        console.log(`${req.method} ${req.url} ${res.statusCode} ${ms}ms`)
    })

    const url = new URL(req.url, "http://localhost")

    if (req.method === "GET" && url.pathname === "/health") {
        return sendJson(res, 200, { status: "ok" })
    }

    if (req.method === "GET" && url.pathname === "/app-config") {
        const platform = url.searchParams.get("platform")
        const version = url.searchParams.get("version")

        if(!PLATFORMS.includes(platform)) return  sendJson(res, 400, { error: "platform must be ios or android" } ) 
        
        if(!VERSION_PATTERN.test(version)) { 
           return sendJson(res, 400, { error: "version must look like 1.2.0"} ) 
        }

        const text = await readFile(CONFIG_PATH, "utf8")
        const config = JSON.parse(text)
        const platformConfig = config[platform]   // config.ios or config.android

        return sendJson(res, 200, {
            platform,
            currentVersion: version,
            latestVersion: platformConfig.latestVersion,
            minSupportedVersion: platformConfig.minSupportedVersion,
            updateRequired: compareVersions(version, platformConfig.minSupportedVersion) === -1,
            updateAvailable: compareVersions(version, platformConfig.latestVersion) === -1,
            storeUrl: platformConfig.storeUrl,
            maintenance: config.maintenance,
            featureFlags: config.featureFlags,
        })
    }

    sendJson(res, 404, { error: "Not found" })
})

server.listen(PORT, () => {
    console.log(`App config server running at http://localhost:${PORT}`)
})

server.on("error", (err)=> {
    if(err.code === "EADDRINUSE" ) {
        console.log(err.message)
        process.exit(1)
    } 
    throw err

})