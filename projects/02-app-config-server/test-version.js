import { compareVersions } from "./lib/version.js"

// 
const tests = [
    ["1.0.0", "1.2.0", -1],
    ["1.2.0", "1.2.0", 0],
    ["1.4.0", "1.2.0", 1],
    ["1.9.0", "1.10.0", -1],   // the trap
    ["2.0.0", "1.99.99", 1],
    ["1.2.10", "1.2.9", 1],
]

for (const [a, b, expected] of tests) {
    const result = compareVersions(a, b)
    const ok = result === expected ? "✅" : "❌"
    console.log(`${ok} compareVersions("${a}", "${b}") = ${result} (expected ${expected})`)
}