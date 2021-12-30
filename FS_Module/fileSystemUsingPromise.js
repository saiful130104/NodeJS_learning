// working with file system module. Through fs module we can do the followings:
// create, read, write, delete, show list of files etc.
// there is mostly two types of version for all method async and sync. we will use async.
// sync version works like blocking mode. it will keep blocked the server during execution this modules.

// we just need to add ".promises" at the end of the module import code.
const fs = require('fs').promises;

async function fileSystemOperations(){
    // create file
    await fs.writeFile('./app.txt', "Learning NodeJS File System Module!!!!!!");

    // read file
    let data = await fs.readFile('./app.txt', 'utf-8');
    console.log(data);

    // rename file
    await fs.rename('./app.txt', 'newFile.txt');

    // delete file
    await fs.unlink('./newFile.txt');
}

fileSystemOperations();