import http from "node:http"
import path from "node:path"
import { appendFile, readFile } from "node:fs/promises"
import { randomUUID } from "node:crypto"
import { readJsonBody } from "./lib/body.js"
import { compareVersions } from "./lib/version.js"
import { sendJson } from "./lib/http.js"

const PORT = Number(process.env.PORT) || 3000
const CONFIG_PATH = path.join(import.meta.dirname, "config.json")
const PLATFORMS = ["ios", "android"]
const VERSION_PATTERN = /^\d+\.\d+\.\d+$/   // "1.2.0" ✅  "1.2" ❌  "abc" ❌
const FEEDBACK_PATH = path.join(import.meta.dirname, "feedback.jsonl")

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

    if(req.method === "POST" && url.pathname === "/feedback") {
        let body
        body = await readJsonBody(req)
            if (typeof body !== "object" || body === null || Array.isArray(body)) {
            return sendJson(res, 400, { error: "Body must be a JSON object" })
        } 
        const { message, rating, platform } = body

        const trimmedMessage = typeof message === "string" ? message?.trim() : ""

        if(trimmedMessage.length === 0 || trimmedMessage.length > 1000 ) {
            return sendJson(res, 400, { error: "message is required (max 1000 characters)" })
        }

        if(rating !== undefined && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
            return sendJson(res, 400, { error: "rating must be a whole number from 1 to 5"  })
        }

        if(!PLATFORMS?.includes(platform)) return  sendJson(res, 400, { error: "platform must be ios or android" } ) 

        const feedback = {
        id: randomUUID(),
        receivedAt: new Date().toISOString(),
        message: trimmedMessage,
        rating: rating ?? null,
        platform,
    }

    await appendFile(FEEDBACK_PATH, JSON.stringify(feedback) + '\n')

    return sendJson(res, 201, { id: feedback.id, receivedAt: feedback.receivedAt })

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