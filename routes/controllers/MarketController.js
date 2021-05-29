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

// {
//     const userId = req.query.uid;
//     var db = firebase.firestore();
//     const userMarkets = [];

//     marketsRef = await db.collection('markets').get()

//     counter = 0;
//     await marketsRef.forEach( snapshot => {
//         if( snapshot.data()['createdBy'] === userId ){
//             userMarkets.push( snapshot.data() );
//             userMarkets[counter]['documentId'] = snapshot.id;
//             counter ++;
//         }
//     });
    
//     res.status(httpStatus.OK).json({ data: userMarkets, success: true })

// } 
router.get('/getMarketForId', async(req, res) => {
    try{
        const idMarket = req.query.idMarket;
        var db = firebase.firestore();
        console.log(idMarket + ' el idMarket');
        const marketRef = db.collection('markets').doc(idMarket);
        const doc = await marketRef.get();

        res.status(httpStatus.OK).json({ data: doc.data(), success: true });

    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error , success: false });
    }
})


module.exports = router;