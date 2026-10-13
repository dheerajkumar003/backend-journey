/* DAY - 03 */
export const sleep = (ms) => {
    return new Promise((resolve)=> {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}