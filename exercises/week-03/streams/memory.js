/* DAY - 02 */
import { readFile } from "node:fs/promises"

const before = process.memoryUsage().rss
const text = await readFile("big.txt", "utf8")
const lines = text.split("\n").length - 1
const after = process.memoryUsage().rss

console.log(`Lines: ${lines}`)
console.log(`Memory used: ${((after - before) / 1024 / 1024).toFixed(1)} MB`)