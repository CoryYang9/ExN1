// const cool = require('cool-ascii-faces')
// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000
//
// const { Pool } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
//
// express()
//     .use(express.static(path.join(__dirname, 'public')))
//     .set('views', path.join(__dirname, 'views'))
//     .set('view engine', 'ejs')
//     .get('/times', (req, res) => res.send(showTimes()))
//     .get('/', (req, res) => res.render('pages/index'))
//     .get('/db', async (req, res) => {
//         try {
//             const client = await pool.connect();
//             const result = await client.query('SELECT * FROM test_table');
//             const results = { 'results': (result) ? result.rows : null};
//             res.render('pages/db', results );
//             client.release();
//         } catch (err) {
//             console.error(err);
//             res.send("Error " + err);
//         }
//     })
//     .get('/cool', (req, res) => res.send(cool()))
//     .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//
// showTimes = () => {
//     let result = '';
//     const times = process.env.TIMES || 5;
//     for (i = 0; i < times; i++) {
//         result += i + ' ';
//     }
//     return result;
// }

var express = require('express')
var mongodb = require('mongodb');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
router.get('/mongodb', function (request, response) {
    mongodb.MongoClient.connect('mongodb+srv://coryyang9:F9sh911@@cluster0.c1nvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err, client) {
        // mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, db) {  // works with mongodb v2 but not v3
        if(err) throw err;
        //get collection of routes
        var db = client.db('heroku_pmk6n54s');  // in v3 we need to get the db from the client
        var Routes = db.collection('Routes');
        //get all Routes with frequency >=1
        Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
            if(err) throw err;
            response.render('mongodb', {results: docs});
        });

        //close connection when your app is terminating.
        // db.close(function (err) {
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
});//end app.get


