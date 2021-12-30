const add = require('./Modules/add');
const sub = require('./Modules/sub');
const mul = require('./Modules/mul');
const div = require('./Modules/div');

// work with command line argument.
const a = parseInt(process.argv[2]);
const choice = process.argv[3];
const b = parseInt(process.argv[4]);

if(choice == 'ADD'){
    console.log(add(a,b));
}
else if(choice == 'SUB'){
    console.log(sub(a,b));
}
else if(choice == 'MUL'){
    console.log(mul(a,b));
}
else if(choice == 'DIV'){
    console.log(div(a,b));
}
else{
    console.log('Please input correctly!!!!');
}