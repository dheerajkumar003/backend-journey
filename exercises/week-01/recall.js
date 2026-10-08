const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(()=> {
           resolve()
        },ms)
    })
}

const fakeApi = async (name, ms) => {
    sleep(ms)
    return `${name} loaded`
}

console.log("start")
const result = await fakeApi("names", 2000)
console.log("result", result)
console.log("done")