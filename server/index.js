const express  = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors')

// our config data
//var config = require('./config');

var env = process.env.NODE_ENV || 'dev'
    , config = require('./config-' + env);



const app = express();
app.use(cors())

app.use(express.static('dist'));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//  get listing of last 10 blocks

//  get listing of last 10 blocks
app.get('/api/v1/blocks/new', function(req, res) {


    res.setHeader('Content-Type', 'application/json');

    eosconfig = {
        chainId: config.eos.chainid, // 32 byte (64 char) hex string
        keyProvider: [config.eos.key], // WIF string or array of keys..
        httpEndpoint: config.eos.endpoint,
        expireInSeconds: 5,
        broadcast: true,
        verbose: true, // API activity
        sign: false
    }


    EosApi = require('eosjs-api')
    //eos = EosApi({config})

    eos = EosApi(eosconfig)
    //var response = eos.getBlock(1, (error, result) => {})



    const makeRequest = async () => {
        const lastBlock = await getBlockInfo()


        //console.log(`new last block: ${lastBlock}`);

        console.log(`new last block:`); console.dir(lastBlock);


        //const value2 = await promise2(value1)
        //return promise3(value1, value2)


        return lastBlock;
    }



    function getBlockInfo() {

        return eos.getInfo();
    }


    makeRequest()
        .then(lastBlock => {

            console.log(`makeRequest:`); console.dir(lastBlock);


        })
        .catch(err => {
            console.log(err);
            // output
            // Error: oops at makeRequest (index.js:7:9)
        })




    var result = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};



    res.send(JSON.stringify(result, null, 2));


});

//  get listing of last 10 blocks
app.get('/api/v1/blocks', function(req, res) {

    res.setHeader('Content-Type', 'application/json');

    eosconfig = {
        chainId: config.eos.chainid, // 32 byte (64 char) hex string
        keyProvider: [config.eos.key], // WIF string or array of keys..
        httpEndpoint: config.eos.endpoint,
        expireInSeconds: 5,
        broadcast: true,
        verbose: true, // API activity
        sign: false
    }


    EosApi = require('eosjs-api')

    eos = EosApi(eosconfig)

    // get last block
    eos.getInfo((error, result) => {


        let lastBlock = result.head_block_num

        function loadBlock(block) {
            return new Promise(resolve => {

                setTimeout(() => {
                    eos.getBlock(block)
                        .then(result => {

                            resolve(result);

                        }).catch(function(error) {

                    })

                }, 100);
            });
        }

        const tasks = [];
        for (let i = 1; i <= 10; i++) {
            tasks.push(() => loadBlock(lastBlock - i));
        }

        const arrayOfPromises = tasks.map(task => task())

        Promise.all(arrayOfPromises).then(result => {
            res.send(JSON.stringify(result, null, 2));
        });


    })


});
module.exports = app

//turn on express server
app.listen(7777, () => console.log('Listening on port 7777!'));
