const apiKey = '78b9d599c4f94f8fa3afb1a5458928d6';
const searchFrom = document.querySelector('.search'); 
const input = document.querySelector('.input');
const category = document.getElementById("category");
const sortBy = document.getElementById("sortBy");
const newsList = document.querySelector('.news-list');

searchFrom.addEventListener('submit', getSearch);
				
document.getElementById("top_entertainment").addEventListener('click' , top_e);
document.getElementById("top_sports").addEventListener('click' , top_s);
document.getElementById("top_technology").addEventListener('click' , top_t);
document.getElementById("top_technology").addEventListener('click' , clear);

function top_e(e) {
	newsList.innerHTML = '';
	e.preventDefault();
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=entertainment&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function top_s(e) {
	newsList.innerHTML = '';
	e.preventDefault();
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=sports&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function top_t(e) {
	newsList.innerHTML = '';
	e.preventDefault();
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=technology&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function clear(e){
	while(newsList.hasChildNodes()){
		newsList.removeChild('li');
	}
	//newsList.innerHTML = '';
	//e.preventDefault();
}

function getSearch(e){
	newsList.innerHTML = '';
	e.preventDefault(); 			
				
	let searchedFor = input.value;
	
	let searchCategory = category.value; 		
	if(searchCategory == 'choose') { //handles no search category 
		searchCategory = 'sports';
	}
	
	let sortPage = sortBy.value;
	if(sortPage == 'choose') { //handles the result sort option
		sortPage = 'relevancy';
	}else {
		var url = 'https://newsapi.org/v2/top-headlines?' +
		    'sortBy=' + sortPage + '&' +
		    'category=' + searchCategory + '&' + 
		    'q=' + searchedFor + '&' + 
		    'apiKey=' + apiKey; 
		console.log(url); 
		getNews(url);	
	}   
	console.log(searchedFor);
			
}

function getNews(url){
	var req = new Request(url);
	
	fetch(req).then(function(response) {
		response.json().then(data => {
			console.log(data);
			if(data.totalResults == 0) {
				document.getElementById("noCategory").style.display = "block";
			}
			
			data.articles.forEach(article => {
				document.createElement('li');
				let li = document.createElement('li');
				if(article.title != 'null') {
					let a = document.createElement('a');
					a.setAttribute('href', article.url);
					a.setAttribute('target', '_blank');
					a.textContent = article.title;
					li.appendChild(a);
				}
				
				let img = document.createElement('img');
				img.alt = "Icon for article";
				if(article.img != 'null') {
					img.src = article.urlToImage; 
				} else {
					img.src = article.urlToImage; //need to fix later
				}
				li.appendChild(img);

				let src = ''; 
				if (article.source.name != 'null') {
					src = 'Source: ' + article.source.name; 
				}
				
				let auth = ''; 
				if (article.author != 'null') {
					' | Author: ' + article.author;
				}
				
				let info = document.createElement('p');
				info.textContent = article.publishedAt + '| Source: ' + article.source.name + ' | Author: ' + article.author;
								
				/*if(src + auth != '') {
					let info = document.createElement('p');
					info.textContent = src + auth;
					li.appendChild(info);
				}*/
								   
				newsList.appendChild(li);
								
			})						
		});
	});
}

/*const searchFrom = document.querySelector('.search'); 
				const input = document.querySelector('.input');
				const newsList = document.querySelector('.news-list');
				
				searchFrom.addEventListener('submit', getNews);
				
				function getNews(e){
					const apiKey = '78b9d599c4f94f8fa3afb1a5458928d6';
					let searchedFor = input.value; 
					console.log(searchedFor);
				}
				
				//this function takes in the category and search keywords in order to get a list of 
				 function getNews(category, search) {
				}
				var url = 'https://newsapi.org/v2/everything?' +
          				'q=Apple&' +
          				'from=2020-10-30&' +
          				'sortBy=popularity&' +
          				'apiKey=78b9d599c4f94f8fa3afb1a5458928d6';

				var req = new Request(url);
				var jsonStr;
				var myArticles

				
				var myArticles = jsonStr[0];
				var mainContainer = document.getElementById("myData");
				for ( var i in myArticles) {
					var div = document.createElement("div");
					div.innerHTML = articles[i].title;
					mainContainer.appendChild(div);
				}*/
				
				
				/*function myFunction() {
					fetch(req)
    					.then(function(response) {
						response.json().then(data => {
							console.log(data); 
							//var obj = JSON.parse(data)
							var myArticles = obj[2]; 
							var toAdd; 
							var mainContainer = document.getElementById("myData");
							for (var i in myArticles) {
								var div = document.createElement("div");
								div.innerHTML = articles[i].title;
								mainContainer.appendChild(div);
							}
  							// do something with your data
						});
						//jsonStr = response.json().then(function(json) {
      							// process your JSON further
						//}); 
        					//console.log(jsonStr);
   				 	})
				}*/
				
