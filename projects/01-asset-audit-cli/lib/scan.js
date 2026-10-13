import { readdir, stat } from "node:fs/promises"
import path from "node:path"

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"]

export const findImages = async (folder) => {
    const entries = await readdir(folder, { recursive: true })
    const images  = entries?.filter((entry)=> {
        const ext = path.extname(entry).toLowerCase()
        return IMAGE_EXTENSIONS?.includes(ext)
    })
    return images
}
export const getSizes = async (folder, images) => {
    const results = await Promise.all(
        images?.map(async (img)=> {
            const stats = await stat(path.join(folder, img))
            return { 
                file: img, kb : (stats.size/1024)
            }
        })
    )
    return results
}