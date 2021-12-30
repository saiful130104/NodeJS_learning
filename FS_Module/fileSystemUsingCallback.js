// working with file system module. Through fs module we can do the followings:
// create, read, write, delete, show list of files etc.
// there is mostly two types of version for all method async and sync. we will use async.
// sync version works like blocking mode. it will keep blocked the server during execution this modules.

// As ES6 in nodejs doesn't support any import and export features
// that's why we need to require.
const fs = require('fs');

// create a file.
// we can create a file using writeFile method.[filename, data is to be written, callback function with err parameter]
const data = "Learning NodeJS File System Module!!!!!!";
fs.writeFile('./app.txt', data , (err) => {
    if(err) console.log(err)
    else console.log('file created successfully!!!!');
});

// read a file.
// we can read a file using readFIle method.[filename, encoding type, callback function with 2 parameter( error, data that is read)]
fs.readFile('./app.txt', 'utf-8', (err, data)=>{
    if(err) console.log(err);
    else console.log(data);
});

// Rename a file
// we can do this using rename method.[oldfilePath, newfilePath, callback function with err parameter]
fs.rename('./app.txt', 'newFile.txt', (err)=> {
    if(err) console.log(err);
    else console.log('file renamed!!!!!!!!');
});

// Delete a file
// we can do this using unlink method.[filePath, callback function with err parameter]
fs.unlink('newFile.txt', (err)=> {
    if(err) console.log(err);
    else console.log('file Deleted!!!!!!!!');
});