const express = require('express');
const router = express.Router();
const httpstatus = require('http-status');
const firebase = require('firebase-admin');
const httpStatus = require('http-status');



router.get('/getMarkets', async (req, res) => {

    try {
        const userId = req.query.uid;
        var db = firebase.firestore();
        const userMarkets = [];

        marketsRef = await db.collection('markets').get()

        counter = 0;
        await marketsRef.forEach( snapshot => {
            if( snapshot.data()['createdBy'] === userId ){
                userMarkets.push( snapshot.data() );
                userMarkets[counter]['documentId'] = snapshot.id;
                counter ++;
            }
        });
        
        res.status(httpStatus.OK).json({ data: userMarkets, success: true })

    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err + ' ', success: false })
    }
});


router.post('/newMarket', async (req, res) => {
    try {
        const marketName = req.body.marketName;
        const description = req.body.description;
        const createdBy = req.body.uid;

        var db = firebase.firestore();

        await db.collection('markets').add({
            supermarket_name: marketName,
            description: description,
            createdBy: createdBy,
            catalogues: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        }).then(response => {
            res.status(httpStatus.OK).json({ marketId: response.id, success: true });
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err + ' ', success: false });
        })


    } catch (err) {
        res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ error: err + ' ', success: false });
    }
})

router.get('/getMarketForId', async(req, res) => {
    try{
        const idMarket = req.query.idMarket;
        var db = firebase.firestore();
        const marketRef = db.collection('markets').doc(idMarket);
        const doc = await marketRef.get();

        res.status(httpStatus.OK).json({ data: doc.data(), success: true });

    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error , success: false });
    }
})


router.delete('/deleteMarketForId', async(req, res) => {
    try{
        const idMarket = req.query.idMarket;
        var db = firebase.firestore();
        
        db.collection('markets').doc(idMarket).delete();
        console.log('heree', idMarket);

        res.status(httpStatus.OK).json({ success: true });

    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error , success: false });
    }
})


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


router.post('/addIdListProductsToMarket', async (req, res) => {
    try{
        const idList = req.body.idList;
        const idMarket = req.body.idMarket;

        var db = firebase.firestore();

        const admin = require('firebase-admin');

        db.collection('markets').doc(idMarket).update({
            catalogues: admin.firestore.FieldValue.arrayUnion(idList)
        }).then(response => {
            res.status(httpStatus.OK).json({ success: true});

        }).catch(error =>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error, super: false})
        })
        
    }catch(error){

    }
});

router.post('/editMarketForId', async (req, res) => {
    try{
        const idMarket = req.body.idMarket;
        const name = req.body.name;
        const desc = req.body.desc;

        var db = firebase.firestore();

        const cityRef = db.collection('markets').doc(idMarket);

        await cityRef.update({supermarket_name: name, description: desc });

        res.status(httpStatus.OK).json({ success: true });
        
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error, success: false})
    }
});

router.get('/getListMarketForId', async(req, res) => {
    try{
        const idList = req.query.idList;
        var db = firebase.firestore();
        const marketRef = db.collection('productsMarket').doc(idList);
        const doc = await marketRef.get();

        res.status(httpStatus.OK).json({ data: doc.data(), success: true });

    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error , success: false });
    }
})



module.exports = router;