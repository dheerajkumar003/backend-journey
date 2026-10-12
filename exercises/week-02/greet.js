/* DAY - 01 */
const userName = process.argv[2]

if (!userName) {
    console.error("Usage: node greet.js <userName>")
    process.exit(1)
}

console.log(`Hello, ${userName}!`)