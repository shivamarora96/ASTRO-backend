var express = require('express');
var config = require('./config.js');
var rashi = require('./rashi.js');
var app = express();
var final = rashi.final;

app.get('/', (req,res)=>{
	let data = rashi.final;
	res.json(data);

});


var server  = app.listen(config.port , function(err){
	if(err){
		throw (err);
		console.log(err);
	}
	else
		console.log('Server started at port :: ' + config.port);
})