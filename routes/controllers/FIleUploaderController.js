const express = require('express');
const router = express.Router();
const firebase = require('firebase-admin')
const uuid = require('uuid-v4');
var bucket = firebase.storage().bucket();

filename = '/home/jose/Escritorio/fire.png'


async function uploadImage(){

    const metadata = {
        metadata: {
            firebaseStorageDownloadTokens: uuid()
        },
        contentType : 'image/png',
        cacheControl :  'public, max-age=31536000',
    };

    await bucket.upload(filename, {
        gzip: true,
        metadata: metadata
    }).then( res => console.log( res[1] ) );
    
}


router.get('/upload', async (req, res) =>{
    uploadImage()
    res.status(200);
});


module.exports = router;