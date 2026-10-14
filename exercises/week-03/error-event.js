import { EventEmitter } from "node:events"

const emitter = new EventEmitter()
emitter.on("error", (err) => console.log(`Handled: ${err.message}`))
emitter.emit("error", new Error("Payment service down"))
console.log("still running?") 