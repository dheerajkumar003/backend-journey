/* DAY - 01 
Write sleep(ms) that returns a Promise which resolves after ms milliseconds.
Hint: new Promise(resolve => setTimeout(resolve, ms)).
Then log "start", await sleep(1000), and log "done" */

// sleep's ONLY job is to wait. It doesn't log anything.
// It returns the Promise (the "receipt") so the caller can await it.
const sleep = (ms) => {
    return new Promise((resolve) => {
        // When the timer finishes, press the "done" button.
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

// Short form of the same thing (what the hint shows):
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

console.log("start")
await sleep(4000) // pauses HERE until resolve() is called
console.log("done")
