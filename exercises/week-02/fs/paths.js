/* DAY - 04 */
import path from "node:path"

console.log("cwd:     ", process.cwd())
// process.cwd() = the folder your terminal is in when you run the command.
// It changes depending on where you run from.
console.log("dirname: ", import.meta.dirname) // the folder where this script file lives. It never changes.
console.log("joined:  ", path.join("assets", "icons", "logo.png"))
console.log("ext:     ", path.extname("photo.jpeg"))
console.log("base:    ", path.basename("/a/b/c/report.pdf"))
console.log("resolved:", path.resolve("notes.json"))