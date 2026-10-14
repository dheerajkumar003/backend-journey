/* DAY - 02 */
import { createReadStream, createWriteStream } from "node:fs"
import { createGzip } from "node:zlib"
import { pipeline } from "node:stream/promises"

console.time("compress")
await pipeline(
    createReadStream("big.txt"),
    createGzip(),
    createWriteStream("big.txt.gz")
)
console.timeEnd("compress")
console.log("Compressed!")