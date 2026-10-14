/* DAY - 02 */
import { createReadStream } from "node:fs"

const before = process.memoryUsage().rss
let lines = 0
let chunks = 0

const stream = createReadStream("big.txt")

stream.on("data", (chunk) => {
    chunks++
    const text = chunk.toString()
    lines += text.split("\n").length - 1
})

stream.on("end", () => {
    const after = process.memoryUsage().rss
    console.log(`Lines: ${lines}`)
    console.log(`Chunks: ${chunks}`)
    console.log(`Memory used: ${((after - before) / 1024 / 1024).toFixed(1)} MB`)
})

stream.on("error", (err) => console.error("Failed:", err.message))