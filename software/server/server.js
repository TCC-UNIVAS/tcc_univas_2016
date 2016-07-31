var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var markers = [{
    lat: -42.934104,
    lng: -22.228512,
    message: "teste"
}];

app.get('/marker', function (req, res) {
    res.send(markers);
    console.log("sending markers");
});

app.post('/marker', function (req, res) {
    console.log("body    "  + req.body.lat);
    markers.push({
        lat: req.body.lat,
        lng: req.body.lng,
        message: req.body.message
    });
    console.log("receiving markers");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});