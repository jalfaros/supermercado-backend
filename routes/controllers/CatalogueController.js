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




module.exports = router;