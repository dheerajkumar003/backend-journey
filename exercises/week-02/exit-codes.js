/* DAY - 01 */
const apiKey = process.env.API_KEY

if(apiKey) {
    console.log(`API key loaded (length: ${apiKey.length})`)
} else {
    console.error("Missing API_KEY")
    process.exit(1)
}