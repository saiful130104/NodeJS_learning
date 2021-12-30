const fs = require('fs').promises;
const filePath = './data.json';

async function readData(filePath){
    let data = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(data);
    let totalSalary = 0;
    data.forEach(element => {
        totalSalary +=element['salary'];
    });

    await fs.writeFile('./total_salary.txt', JSON.stringify(totalSalary));
}

readData(filePath);