const http = require('http');
const fsp = require('fs').promises;
const bicyclesInfo = require('./data/data.json');

const server = http.createServer( async (req, res) => {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = myUrl.pathname;
    const id = myUrl.searchParams.get('id');
    if (pathname ==='/favicon.ico') return;
    if (pathname === '/' || pathname === '/homepage') {
        let homepage = await fsp.readFile('./views/bicycles.html', 'utf-8');
        const singleBicycle = await fsp.readFile('./views/partials/bicycle.html', 'utf-8');
        let allTheBicycles = '';
        for( let index = 0; index < 6; index += 1){
            allTheBicycles += replaceTemplate(singleBicycle, bicyclesInfo[index]);
        }
        homepage = homepage.replace(/<%AllTheBicycles%>/g, allTheBicycles);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(homepage);
    } else if (pathname === '/bicycle' &&  id >= 0 && id <= 5){
        let bicyclePage = await fsp.readFile('./views/overview.html', 'utf-8');
        const bicycle = bicyclesInfo.find( bicycle => bicycle.id === id);
        bicyclePage = replaceTemplate(bicyclePage, bicycle);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(bicyclePage);
    } else if (/\.(css)$/i.test(req.url)) {
        const css = await fsp.readFile('./public/css/index.css');
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(css);
    } else if (/\.(png)$/i.test(req.url)) {
        const image = await fsp.readFile(`./public/images/${req.url.slice(1)}`);
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(image);
    } else if (/\.(svg)$/i.test(req.url)) {
        const image = await fsp.readFile('./public/images/icons.svg');
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.end(image);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1 style ="text-align:center; margin:300px"> Page Not Found.</h1>');
    }
});

server.listen(3000);

function replaceTemplate( bicyclePage, bicycle ) {
    bicyclePage = bicyclePage.replace(/<%IMAGE%>/g, bicycle.image);
    bicyclePage = bicyclePage.replace(/<%NAME%>/g, bicycle.name);
    let price = bicycle.originalPrice;
    if (bicycle.hasDiscount) {
        price = price*(100 - bicycle.discount) / 100;
        bicyclePage = bicyclePage.replace(/<%DISCOUNT%>/g, `<div class="discount__rate"><p>${bicycle.discount}% Off</p></div>`);
    } else {
        bicyclePage = bicyclePage.replace(/<%DISCOUNT%>/g, '');
    }
    bicyclePage = bicyclePage.replace(/<%NEWPRICE%>/g, `$${price}`);
    bicyclePage = bicyclePage.replace(/<%OLDPRICE%>/g, `$${bicycle.originalPrice}`);
    bicyclePage = bicyclePage.replace(/<%ID%>/g, bicycle.id);
    for (let index = 0; index < bicycle.star; index += 1) {
        bicyclePage = bicyclePage.replace(/<%STAR%>/, 'checked');
    }
    bicyclePage = bicyclePage.replace(/<%STAR%>/g, '');
    return bicyclePage;
}