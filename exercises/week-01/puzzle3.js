setTimeout(() => {
  console.log('A');
  Promise.resolve().then(() => console.log('B'));
}, 0);
setTimeout(() => console.log('C'), 0);
Promise.resolve().then(() => console.log('D'));


/* Predicted Output: 
D
A
B
C
*/