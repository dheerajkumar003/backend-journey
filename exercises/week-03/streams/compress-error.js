import { createReadStream, createWriteStream } from "node:fs"
import { createGzip } from "node:zlib"
import { pipeline } from "node:stream/promises"
import { rename, unlink } from "node:fs/promises"

const input = "does-not-exist.txt"
const output = "big.txt.gz"
const temp = `${output}.tmp`

console.time("compress")
try {
await pipeline(
    createReadStream(input),
    createGzip(),
    createWriteStream(temp)    
)
await rename(temp, output)
console.log("Compressed!")
} catch (error) {
    await unlink(temp).catch(() => {})
    if(error.code === "ENOENT") {
        console.error("Input file not found")
        // process.exit(1) // stop here & dont execute further
        process.exitCode = 1 // use when other code still needs to finish
    } else {
        throw error                              
    }
} finally {
console.timeEnd("compress")
}
