setTimeout(() => console.log('set timeout'), 0);
setImmediate(() => console.log('set immediate1'));

process.nextTick(() => console.log('next tick1'));
console.log('Console log after next tick1');

Promise.resolve().then(() => console.log('promise1 resolved'));
Promise.resolve().then(() => console.log('promise2 resolved'));
Promise.resolve().then(() => {
    console.log('promise3 resolved');
    process.nextTick(() => console.log('next tick2 in Promise3'));
    setImmediate(() => console.log('set immediate2 in Promise3'));
});
Promise.resolve().then(() => console.log('promise4 resolved'));

setImmediate(() => console.log('set immediate3'));
setImmediate(() => console.log('set immediate4'));

process.nextTick(() => console.log('next tick3'));
console.log('Console log at the end!');

