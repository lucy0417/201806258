const express = require('express');
const router = express.Router();

const fs = require('fs');
const async = require('async');

router['get']('/',function (req, res, next) {
    fs.readdir('./public/doc', function (err, files) {
        console.log(files);
        async.eachSeries(files, parse, function () {
            console.log('OK');
            res.render('demo')
        });
    });
});

function parse(file, callback){
    console.log(file);
    callback();
}

module.exports = router;