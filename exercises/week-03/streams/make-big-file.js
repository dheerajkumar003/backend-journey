/* DAY - 02 */
import { createWriteStream } from "node:fs"

const out = createWriteStream("big.txt")

for (let i = 1; i <= 1_000_000; i++) {
    out.write(`Line ${i}: this is some log text for testing streams\n`)
}

out.end()
out.on("finish", () => console.log("Done writing big.txt"))