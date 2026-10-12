/* DAY - 01 */
import pc from "picocolors";
const userName = process.argv[2];

if (!userName) {
  console.error(pc.red("Usage: node greet.js <userName>"));
  process.exit(1);
}

//use -- whenever you pass arguments through npm.
// It always works, and it saves you from a confusing bug
// when an argument happens to start with -
// npm run greet -- Dheeraj-Kumar
console.log(pc.blue(`Hello, ${userName}, Good Morning!`));
