import http from  "node:http"

const PORT = Number(process.env.PORT) || 3000

const sendJson = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(data))  
}

const server = http.createServer((req, res) => {
    const start = Date.now()
    res.on("finish", () => {
    const ms = Date.now() - start
    console.log(`${req.method} ${req.url} ${res.statusCode} ${ms}ms`)
})

    const url = new URL(req.url, "http://localhost")

    if (req.method === "GET" && url.pathname === "/health" ) {
       sendJson(res, 200, { status: "ok", uptime: process.uptime() })
    } else if (req.method === "GET" && url.pathname === "/time") {
       sendJson(res, 200, { now: new Date().toISOString() })
    } else if (req.method === "GET" && url.pathname === "/greet") {
        const name = url.searchParams.get("name")
        if (!name) {
        return sendJson(res, 400, { message: `Name is required` })
        } 
        sendJson(res, 200, {  message: `Hello, ${name}!` })
    }
    else {
       sendJson(res, 404, { error: "Not found" } )
    }
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

server.on("error", (err)=> {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Is the server already running?`)
        process.exit(1)
    } 
    throw err
})