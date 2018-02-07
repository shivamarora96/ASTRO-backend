var request = require('request');
var cheerio = require('cheerio');
var config = require('./config.js');

//Demo Response (Created Dynamically in server.js)
var single = {
	title: " ",
	content: " ",
};


//Actual Response
var final = {
	status: false,
	date: " ",
	data: [],
	count: 0,
}

function getJSON(){

	request(config.url, function(err,response,html){


		if(err){
			console.log(err);
			return final;
		}


		var $ = cheerio.load(html,{
			ignoreWhitespace:false,
		});
		var todayRashi = $('.blog-posts').children().first().children();
		var date = todayRashi.first().text();
		final.date = date;
		// console.log(final);	
		var content = todayRashi.last();
		var postbody = $('.MsoNormal', content);		

		var text = "";
		var title = "";
		for(var i = 0 ; i<=48; i++){
			var current_text = postbody.eq(i).text();
				
			
			if(text.length<2){
				
				var titlehtml = $('b', postbody.eq(i)).first();
				title = titlehtml.text() + titlehtml.next().text();
				// console.log(title + "\n");
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

		return final;
	});

}

getJSON();

module.exports.final = final;
