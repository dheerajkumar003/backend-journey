/* DAY - 04-05 */
const sleep = (ms) => {
    return new Promise((resolve)=> {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}

const fetchJson = async (url, timeoutMs) => {
    const response = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs)
    })
    if(!response.ok) {
        // throw Error("Something went wrong")
        throw new Error(`Request failed with status ${response.status}`) 
    }
    return response.json()
} 
      
const withRetry = async (fn, attempts, delayMs) => {
    let lastError;
    for(let i = 1; i<= attempts; i++) {
        try {
            return await fn()
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i} failed with ${delayMs} miliseconds delay due to ${error.message}`)
            if(i < attempts) {
                await sleep(delayMs)
            }
        }
    }

    throw lastError
}


// const data = await withRetry(()=>fetchJson("https://httpbin.org/status/500", 2000), 3, 500)
// console.log("🚀 ~ data:", data)

const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",   // works
    "https://httpbin.org/delay/5",                    // too slow → timeout
    "https://httpbin.org/status/500",                 // server error
]
console.time("total")
const results = await Promise.allSettled(
    urls.map((url)=>  withRetry(()=> fetchJson(url, 2000), 3, 2000)))

results.forEach((result, index)=> {
     const url = urls[index] 
    if(result.status === "fulfilled") {
        console.log(`✅ ${url}`)
    } else {
        console.log(`❌ ${url} - ${result.reason.message}`)
    }
 })
console.timeEnd("total")