const { lazer } = require('./lazer-js.js');

const buffer = lazer()
    .buffer()
    .print("Testing")
    .return();

    // console.log(buffer);