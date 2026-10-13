import path from "node:path"
import { stat, writeFile } from "node:fs/promises"
import { findImages, getSizes } from "./lib/scan.js"
import { parseArgs } from "node:util"

// const folderArg = process.argv[2]
const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
        "max-kb": { type: "string", default: "500" },
        json: { type: "string" },
    },
})

const maxKb = Number(values["max-kb"])

if(Number.isNaN(maxKb) || maxKb <= 0 ) {
console.error("--max-kb must be a positive number")
process.exit(1)
}

const folderArg = positionals[0]

if (!folderArg) {
    console.error("Usage: node audit.js <assets-folder> [--max-kb=500] [--json report.json]")
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
    return img.kb > maxKb 
}).sort((a, b) =>{ 
    return b.kb - a.kb
})

const totalHeavyKb = heavy.reduce((sum, item) => sum + item.kb, 0)

if (heavy.length === 0) {
    console.log(`✅ All ${sizes.length} images are under ${maxKb} KB`)
} else {
    console.log(`\nHeavy images (over ${maxKb} KB):`)
    heavy.forEach((item) => {
        console.log(`  ${item.kb.toFixed(0).padStart(10)} KB  ${item.file}`)
    })
    console.log(
        `\nScanned ${sizes.length} images · ${heavy.length} over the limit · ` +
        `${(totalHeavyKb / 1024).toFixed(1)} MB could be optimised`
    )
}

if (values.json) {
    const report = {
        scannedAt: new Date().toISOString(),
        folder,
        maxKb,
        scanned: sizes.length,
        heavyCount: heavy.length,
        totalHeavyKb,
        heavy,
    }
    const reportPath = path.resolve(values.json)
     const json = JSON.stringify(report, null, 2)
       await writeFile(reportPath, json)
    console.log(`Report saved to ${reportPath}`)
}

if (heavy.length > 0) {
    process.exit(1)
}