const express = require('express');
const router = express.Router();
const firebase = require('firebase-admin');
const httpStatus = require('http-status');

router.post('/newListProductsMarket', async (req, res) => {

    try{
        const listProductsName = req.body.listProductsName;

        var db = firebase.firestore();

        await db.collection('productsMarket').add({
            listMarketName: listProductsName,
            products: []
        }).then(response => {
            res.status(httpStatus.OK).json({ idListProduct: response.id, success: true});
        }).catch(error => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error, success: false });
        })

    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err, success: false});
    }
});


