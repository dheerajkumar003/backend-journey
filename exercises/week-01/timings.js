/*
Write fakeApi(name, ms) that waits ms and then returns `${name} loaded`.
Call it three times (1000, 1500 and 500 ms):
once sequentially, and
once with Promise.all.
Measure both with console.time / console.timeEnd.
Before running it, write down how long you expect each version to take.
*/

// My prediction: sequential ≈ ____ ms, parallel ≈ ____ ms

// Pretends to be a network call: waits `ms`, then gives back a value.
const fakeApi = (name, ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${name} loaded`) // this string is what `await` will give back
        }, ms)
    })
}

// Version A: sequential. Each `await` waits for the previous call to finish.
// console.time("sequential")
// const user = await fakeApi("user", 1000)
// const orders = await fakeApi("orders", 1500)
// const notifications = await fakeApi("notifications", 500)
// console.log([user, orders, notifications])
// console.timeEnd("sequential")

// Version B: parallel. All three start at once; we wait for all of them together.
console.time("parallel")
const results = await Promise.all([
    fakeApi("user", 1000),
    fakeApi("orders", 1500),
    fakeApi("notifications", 500),
])
console.log(results) // same order as the array above, even though "notifications" finished first
console.timeEnd("parallel")
