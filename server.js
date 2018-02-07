var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var rashi = require('./rashi.js');

var app = express();
var port = process.env.port || 80 ;

var baseURL = 'http://blog.jyotishguru.com/';

app.get('/', (req,res)=>{
	request(baseURL, function(err,response,html){

		var final = rashi.final;

		if(err){
			res.json(final);
			return;
		}


		var $ = cheerio.load(html,{
			ignoreWhitespace:false,
		});
		var todayRashi = $('.blog-posts').children().first().children();
		
		var date = todayRashi.first().text();
		final.date = date;
		var content = todayRashi.last();
		var postbody = $('.MsoNormal', content);		

		var text = "";
		var title = "";
		for(var i = 0 ; i<=48; i++){
			var current_text = postbody.eq(i).text();
				
			
			if(text.length<2){
				
				var titlehtml = $('b', postbody.eq(i)).first();
				title = titlehtml.text() + titlehtml.next().text();
				console.log(title + "\n");
			}



			if(current_text.length > 5)
				text = text + "\n" + current_text;
	

			else{
				var single = new Object();
				single.index = final.count ;
				single.date = date;
				single.title = title;
				single.content = text;
				final.data.push(single);
				final.count++; 
				text = "";
			}

		}

		final.status = true;

		res.json(final);
	});

});


var server  = app.listen(port , function(err){
	if(err)
		console.log(err);
	else
		console.log('Server started at port :: ' + port);
})