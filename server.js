const app = require('./app');
const http = require('http');


const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

const server = http.createServer(app);

const firebase = require('firebase-admin');
const serviceAccount = require('./supermarket-49415-firebase-adminsdk-lzhtv-e990ee8191.json')

firebase.initializeApp({
    credential: firebase.credential.cert( serviceAccount )
})


server.listen( port, () => {
    console.log(`Servidor corriendo en http://${hostname}:` + server.address().port )
})