/*
Make fakeApi reject when name === 'orders'. Then:
Use Promise.all and catch the error.
What happens to the other two results?
Switch to Promise.allSettled and print every result. What's different?
Remove the try/catch and run it.
Read the error output carefully, because you'll see it many times as a backend developer.
*/

const fakeApi = (name, ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (name === "orders") {
                reject(new Error("Orders service is down")) // the "failed" button
            } else {
                resolve(`${name} loaded`) // the "done" button
            }
        }, ms)
    })
}

// Part 1: Promise.all is "all or nothing".
// One rejection makes the whole thing reject, and you lose the other results.
try {
    const results = await Promise.all([
        fakeApi("user", 1000),
        fakeApi("orders", 1500),
        fakeApi("notifications", 500),
    ])
    console.log("Part 1 results:", results) // never runs
} catch (error) {
    console.log("Part 1 caught:", error.message)
}

// Part 2: Promise.allSettled waits for every call and reports each one's outcome.
// const settled = await Promise.allSettled([
//     fakeApi("user", 1000),
//     fakeApi("orders", 1500),
//     fakeApi("notifications", 500),
// ])
// console.log("Part 2 results:", settled)

// Part 3: no try/catch. Uncomment these lines, run the file, and read the crash output.
// const crashed = await Promise.all([
//     fakeApi("user", 1000),
//     fakeApi("orders", 1500),
// ])
// console.log("Part 3: this line never runs", crashed)
