const start = Date.now();
setInterval(() => {
  console.log(`tick at ${Date.now() - start}ms`);
}, 100);

setTimeout(() => {
  console.log('--- starting heavy work ---');
  const end = Date.now() + 3000;
  while (Date.now() < end) {} // busy loop for 3 seconds
  console.log('--- heavy work done ---');
}, 500);

setTimeout(() => process.exit(), 10000);

/* Predicted Output: 701438
tick at 
--- starting heavy work ---
--- heavy work done ---
*/