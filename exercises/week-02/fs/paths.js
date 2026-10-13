/* DAY - 04 */
import path from "node:path"

console.log("cwd:     ", process.cwd())
console.log("dirname: ", import.meta.dirname)
console.log("joined:  ", path.join("assets", "icons", "logo.png"))
console.log("ext:     ", path.extname("photo.jpeg"))
console.log("base:    ", path.basename("/a/b/c/report.pdf"))
console.log("resolved:", path.resolve("notes.json"))