import path from "node:path"
import { stat } from "node:fs/promises"
import { findImages, getSizes } from "./lib/scan.js"

const MAX_KB = 500
const folderArg = process.argv[2]

if (!folderArg) {
    console.error("Usage: node audit.js <assets-folder>")
    process.exit(1)
}

const folder = path.resolve(folderArg)

const checkFolder = async () => {
    try {
        const stats = await stat(folder)
        if (!stats.isDirectory()) {
            console.error(`Not a folder: ${folder}`)
            process.exit(1)
        }    
    } catch (error) {
        if (error.code === "ENOENT") {
            console.error(`Folder not found: ${folder}`)
            process.exit(1)
        }
        throw error
    }
}
await checkFolder()
console.log(`Scanning: ${folder}`)

const images = await findImages(folder)
const sizes = await getSizes(folder, images)

const heavy = sizes.filter((img)=>{
    return img.kb > MAX_KB 
}).sort((a, b) =>{ 
    return b.kb - a.kb
})

if (heavy.length === 0) {
    console.log(`✅ All ${sizes.length} images are under ${MAX_KB} KB`)
    process.exit(0)
}

console.log(`\nHeavy images (over ${MAX_KB} KB):`)
heavy.forEach((el)=> {
     console.log(`  ${el.kb.toFixed(1).padStart(10)} KB  ${el.file}`)
})

const totalHeavyKb = heavy.reduce((sum, item) => sum + item.kb, 0)

console.log(
    `\nScanned ${sizes.length} images · ${heavy.length} over the limit · ` +
    `${(totalHeavyKb / 1024).toFixed(1)} MB could be optimised`
)