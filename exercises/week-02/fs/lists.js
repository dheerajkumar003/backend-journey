/* DAY - 04 */
import { readdir, stat } from "node:fs/promises"
import path from "node:path"

/*
./exercises/week-02/fs      ← import.meta.dirname (where list.js is)
.../exercises/week-02         ← ".." (up one)
.../exercises                 ← ".." (up again)
.../exercises/week-01         ← "week-01" (down into it)
*/

const folder = path.join(import.meta.dirname, "..", "..", "week-01")
// console.log("path:",folder)

//Get the file names in the folder week-01
const names = await readdir(folder)
// console.log(names)

//Get the file names in the folder week-01 along with its size
let fileCount = 0;
let totalBytes = 0;

for (const name of names) {
    const filePath = path.join(folder, name)
    const stats = await stat(filePath)
    if (stats.isDirectory()) continue
    // fileCount = names.length
    fileCount++ //increment fileCount 
    const kb = (stats.size / 1024).toFixed(1)
    // console.log(`${name}   ${kb} KB`)
    console.log(`${name.padEnd(16)} ${kb} KB`)
    totalBytes = totalBytes + stats.size
}

console.log(`Total: ${fileCount} files, ${(totalBytes / 1024).toFixed(1)} KB`)