const express = require('express');
const router = express.Router();
const httpstatus = require('http-status');
const firebase = require('firebase-admin');


// Post, Update --> req.body
// get... --> req.query

router.post('/createNewCatalogue', ( req, res ) => {

    const catalogueName = req.body.catalogueName;
    const createdBy = parseInt( req.body.createdBy );

    try {
        
        var db = firebase.firestore();

        db.collection('catalogues').add({
            catalogue_name : catalogueName,
            created_by: createdBy,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            products: []

        }).then( response => {
            res.status( httpstatus.OK ).json( { idCatalogue: response.id, success: true } )

        }).catch( err => {
            res.status( httpstatus.OK ).json( { error: err + ' ', success: false } )
        })

    }catch( error ) {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ error: error + ' ', success: false })
    }
})

router.delete('/test', ( req, res ) => {
    try{
        res.status( httpstatus.OK ).json({ success: true })
    }catch(err){
        return err;
    }
});

router.delete('/deleteCatalogue', async(req, res) => {
    const idCatalogue = req.query.idCatalogue;
    console.log(idCatalogue, 'Aquiiiiiiii');

    try{
        var db = firebase.firestore();

        await db.collection('catalogues').doc( idCatalogue ).delete().then( response => {
            console.log(response);
            res.status( httpstatus.OK ).json({ success: true })
        }).catch( error => {
            res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ error, success: false })
        });

    }catch( error ){
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ error: error + ' ', success: false })
    }
})




module.exports = router;