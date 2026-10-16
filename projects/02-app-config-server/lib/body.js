export const readJsonBody = async (req, maxBytes = 10 * 1024) => {
    const chunks = []
    let size = 0

    for await (const chunk of req) {
        size += chunk.length
        if (size > maxBytes) {
            const error = new Error("Body too large")
            error.statusCode = 413
            throw error
        }
        chunks.push(chunk)
    }

    const text = Buffer.concat(chunks).toString("utf8")

    try {
        return JSON.parse(text)
    } catch {
        const error = new Error("Invalid JSON")
        error.statusCode = 400
        throw error
    }
}