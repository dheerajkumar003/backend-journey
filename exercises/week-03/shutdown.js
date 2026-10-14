/* DAY - 01 */
const timer = setInterval(() => console.log("working..."), 500)

process.on("SIGINT", () => {
    console.log("\nCtrl+C received, cleaning up...")
    clearInterval(timer)
    console.log("Goodbye 👋")
    process.exit(0)
})