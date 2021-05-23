const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const firebase = require('firebase-admin');




router.post('/newProduct', (req, res) => {

    try {

        var db = firebase.firestore();

        const productName = req.body.productName;
        const description = req.body.description;
        const imgURL = req.body.imgURL;
        const estimatedCost = req.body.estimatedCost;
        const tag = req.body.tag;

        db.collection('products').add({
            product_name: productName,
            description: description,
            img_url: imgURL,
            estimatedCost: estimatedCost,
            tag: tag
        }).then(response => {
            res.status(httpStatus.OK).json({ idProduct: response.id, success: true });
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err + '', success: false });
        });

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error + '', success: false });
    };

});


router.delete('/deleteProduct', async (req, res) => {
    try {

        const productId = req.body.productId;

        var db = firebase.firestore();
        await db.collection('products').doc( productId ).delete().then( response => {
            res.status( httpStatus.OK ).json({ response: response, success: true })
        }).catch( err => {
            res.status( httpStatus.INTERNAL_SERVER_ERROR ).json( { error: err + ' ', success: false } )
        })

    } catch (err) {
        res.status( httpStatus.INTERNAL_SERVER_ERROR ).json({ error: err + ' ', success: false })
    }
})





module.exports = router;