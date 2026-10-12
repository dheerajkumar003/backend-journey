/* DAY - 01 */
console.log(typeof window);
console.log(typeof document);
// words: window and document belong to the browser (the page and the screen).
// Node has no screen, so they don’t exist
console.log(typeof process);
// process is Node’s own object, which is why it’s object
console.log(process.platform);
console.log(process.version);
