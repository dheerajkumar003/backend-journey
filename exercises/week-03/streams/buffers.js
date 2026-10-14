/* DAY - 02 */
const text = Buffer.from("Hello")
console.log(text)
console.log("bytes:", text.length)
console.log("back to text:", text.toString())

const emoji = "👋"
console.log("characters:", emoji.length)
console.log("bytes:", Buffer.from(emoji).length)