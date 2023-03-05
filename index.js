const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const axios = require('axios')
const {Client, PlaceAutocompleteType} = require("@googlemaps/google-maps-services-js");

const port = 3000
const key ="AIzaSyDVEN-F_CqnW5iN_p2SGkmq6eyDg7VOpnY"

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({  
    extended: true})); 
   app.use(cors())



// app.get('index', (req, res) => {
//     res.sendFile('http://localhost:3000/index.html')
// })

app.get('/helloworld', (req, res) => {
    res.send("Hello World")
})

app.post('/helloworld', (req, res) => {
    let shower = ``;
    let wifi = ``;
    let shelter = ``;
    let food = ``;

    if(req.body.Shower) {
        shower = "showers near ";
    }

    if(req.body.Wifi) {
        wifi = "free wifi in ";
    }

    if(req.body.Shelter) {
        shelter = "homeless shelters in ";
    }

    if(req.body.Food) {
        food = "free food in "
    }
    res.send({query: `${shower}${wifi}${shelter}${food}${req.body.zipcode}`})
})

app.post('/', (req, res) => {
    var nalist = [];
    var needsListIndex;
    var needsList = ["free wifi in ", "homeless shelters in ", "places to shower in ", "free food in "];
    
    if(req.body.need == 'wifi') {
        needsListIndex = 0;
    }
    if(req.body.need == 'shelter') {
        needsListIndex = 1;
    }
    if(req.body.need == 'shower') {
        needsListIndex = 2;
    }
    if(req.body.need == 'food') {
        needsListIndex = 3;
    }

    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${needsList[needsListIndex]}${req.body.zipcode}&key=${key}`,
        headers: { }
    };

    axios(config)
    .then(function (response) {
        for(var i = 0; i < 3; i++) {
            nalist.push({name: response.data.results[i].name, address: response.data.results[i].formatted_address})
        }
        res.send(nalist);
    })
    .catch(function (error) {
        res.send(error);
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


