console.log('Start...');

function callback(){
    console.log('Middle part of the code...!');
}

const waitTill = 1000;

setTimeout(callback, waitTill);

console.log('Finished!');
