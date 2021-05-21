const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const firebase = require('firebase-admin');



// Faltan agregar los demás datos

router.post('/newProduct', (req, res) => {

    try {

        var db = firebase.firestore();
        
        const catalogueID   = req.body.catalogueID;
        const productName   = req.body.productName;
        const imgURL        = req.body.imgURL;
        const tag           = req.body.tag;

        console.log( req.body )

        db.collection('catalogues').doc( catalogueID ).update({

            products: firebase.firestore.FieldValue.arrayUnion({
                product_name: productName,
                imgUrl : imgURL,
                tag : tag,
                weight: '1kg',
                description: 'abc',
                stimated_cost: 2000
            })

        }).then( response => {
            res.status(httpStatus.OK).json( { response , success:true});
        }).catch( err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err + '', success:false });
        });
        
    } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error + '', success:false });        
    };

});



module.exports = router;

