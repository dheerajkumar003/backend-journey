/* DAY - 01 */
import { EventEmitter } from "node:events"

const emitter = new EventEmitter()

const onTick = (n) => console.log("tick", n)
emitter.on("tick", onTick)

emitter.emit("tick", 1)
emitter.emit("tick", 2)
emitter.off("tick", onTick)
emitter.emit("tick", 3)
