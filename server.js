const app = require('./app');
const http = require('http');


const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

const server = http.createServer(app);




server.listen( port, () => {
    console.log(`Servidor corriendo en http://${hostname}:` + server.address().port )
})