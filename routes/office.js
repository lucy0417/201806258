const express = require('express');
const router = express.Router();

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
const path = require('path');

router['get']('/', function (req, res) {

    const content = fs.readFileSync(path.resolve(__dirname, '../public/doc/input.docx'));

    const zip = new JSZip(content);

    const doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData({
        first_name: 'Lucy',
        last_name: 'Childs',
        demo:'Hello, World!',
        description: 'This is a demo of generate a document by template!',
        // loop:[
        //     {name:'foo',price:'12.9'},
        //     {name:'bar',price:'69.9'}
        // ]
    });

    try {
        doc.render();
    }catch (e) {
        console.log(JSON.stringify({error: e}));
        throw e;
    }

    const buf = doc.getZip().generate({type: 'nodebuffer'});

    fs.writeFileSync(path.resolve(__dirname, '../public/doc/output.docx'), buf);

    res.render('office',{docdir:'/doc/output.docx'});
});

module.exports = router;


