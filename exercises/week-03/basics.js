/* DAY - 01 */
import { EventEmitter } from "node:events"

const emitter = new EventEmitter()

emitter.on("greet", (name) => console.log(`Listener 1: hello ${name}`))
emitter.on("greet", (name) => console.log(`Listener 2: hi ${name}`))
emitter.once("greet", (name) => console.log(`Listener 3: Good morning, ${name}`))

console.log("before emit")
emitter.emit("greet", "Dheeraj")
emitter.emit("greet", "Dheeraj")
console.log("after emit")