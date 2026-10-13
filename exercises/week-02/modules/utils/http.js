/* DAY - 03 */
import {sleep} from "./sleep.js"

export const fetchJson = async (url, timeoutMs) => {
    const response = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs)
    })
    if(!response.ok) {
        // throw Error("Something went wrong")
        throw new Error(`Request failed with status ${response.status}`) 
    }
    return response.json()
} 
      
export const withRetry = async (fn, attempts, delayMs) => {
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