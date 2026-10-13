/* DAY - 03 */
import { fetchJson, withRetry } from "./utils/http.js"

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