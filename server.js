const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const controller = require('./controller/controller');
const express = require('express');

const PORT = 3000;

// Create application
var app = express();

// Adds static folder "public"
app.use(express.static('public'));

// function to run
app.get('/', function (req, res){
  controller.getAbout(req, res);
});

app.get('/eats&treats', function (req, res){
  controller.getEats(req, res);
});

app.get('/cheers&beers', function (req, res){
  controller.getCheers(req, res);
});

app.get('/treatyoself', function (req, res){
  controller.getTreat(req, res);
});

app.get('/submitadeal', function (req, res){
  controller.submitDeal(req, res);
});

// Start the server
app.listen(3000, function(){
  console.log('Listening at port ', PORT);
});
