var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res){
	url = 'https://www.adafruit.com/wishlists/432441';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var user, listTitle, total;
			var json = {user:"", listTitle:"",total:""};
			
			$('#auth-intro').filter(function(){
				var data = $(this);

				user = data.children().last().text().substring(23);
				console.log("user:"+user);
				json.user = user;
				
			});

				$('h2').filter(function(){
				//var data = $(this).children().text();
				var data = $(this).text();

//				listTitle = data.substring(data.length - 17);
				console.log("listTitle:"+data);
				json.listTitle = data;
				
			});

			$('.wishlist-total').filter(function(){
				//var data = $(this).children().text();
				var data = $(this).text();

//				listTitle = data.substring(data.length - 17);
				console.log("total:"+data);
				json.total = data;
				
			});
		
			res.send(json);
		}
	});
});


app.listen(3000, function(){
	console.log('port 3000');
});
