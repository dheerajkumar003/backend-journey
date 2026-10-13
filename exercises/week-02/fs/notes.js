/* DAY - 04 */
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import pc from "picocolors"
const NOTES_FILE = path.join(import.meta.dirname, "notes.json")

const loadNotes = async () => {
    try {
        const text = await readFile(NOTES_FILE, "utf8")
        return JSON.parse(text)
    } catch (error) {
        if (error.code === "ENOENT") {
            return []
        }
        throw error   // any other problem: don't hide it
    }
}

const saveNotes = async (notes) => {
   const json = JSON.stringify(notes, null, 2)
   await writeFile(NOTES_FILE, json)
}

// await saveNotes(["new test note"])
// console.log(await loadNotes()) 

const command = process.argv[2]   // "add" or "list"
const text = process.argv[3]      // the note text (only used by "add")


if (command === "add") {
    if (!text) {
       console.error(pc.red("Did not recieved any text"));
        process.exit(1)
    }
    const notes = await loadNotes()
    notes.push(text) 
    await saveNotes(notes)
    console.log(`Added: ${text}`)
} else if (command === "list") {
    const notes = await loadNotes()
    if(notes.length > 0) {
        notes.forEach((note, index) => console.log(`${index + 1}. ${note}`))
    } else {
        console.log("No Notes Yet!")
    }
} else {
    console.error('Usage: node notes.js add "note text"  |  node notes.js list')
    process.exit(1)
}