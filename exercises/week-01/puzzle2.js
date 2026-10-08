async function task() {
  console.log('2');
  await null;
  console.log('4');
}
console.log('1');
task();
console.log('3');

/* Predicted Output: 
1
3
2
4
*/