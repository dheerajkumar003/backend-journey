/* DAY - 01 */
console.log(process.argv);
console.log(Number(process.argv[3]));

// [
//   '/usr/local/Cellar/node/25.1.0/bin/node',      ← [0] the node program itself
//   '.../exercises/week-02/args.js',               ← [1] the file being run
//   'hello',                                       ← [2] your first word starts HERE
//   '42',                                          ← [3] note the quotes: a STRING, not a number
//   '--verbose'                                    ← [4]
// ]

// If you need a number, convert it with Number(process.argv[3]).
