const apiKey = '78b9d599c4f94f8fa3afb1a5458928d6';
const searchFrom = document.querySelector('.search'); 
const input = document.querySelector('.input');
const category = document.getElementById("category");
const sortBy = document.getElementById("sortBy");
const newsList = document.querySelector('.news-list');
var currPage = document.getElementById("home"); 

update_page('home');
searchFrom.addEventListener('submit', getSearch);
				
document.getElementById("top_entertainment").addEventListener('click' , top_e);
document.getElementById("top_sports").addEventListener('click' , top_s);
document.getElementById("top_technology").addEventListener('click' , top_t);
document.getElementById("home").addEventListener('click' , clear);

function top_e(e) {
	update_page('top_entertainment');
	newsList.innerHTML = '';
	e.preventDefault();
	input.value = '';
	sortBy.value = '';
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=entertainment&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function top_s(e) {
	update_page('top_sports');
	newsList.innerHTML = '';
	e.preventDefault();
	input.value = '';
	sortBy.value = '';
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=sports&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function top_t(e) {
	update_page('top_technology');
	newsList.innerHTML = '';
	e.preventDefault();
	input.value = '';
	sortBy.value = '';
	
	var url = 'https://newsapi.org/v2/top-headlines?' + 
	    'country=us&' + 
	    'category=technology&' + 
	    'apiKey=' + apiKey;
	
	getNews(url);
}

function clear(e){
	update_page('home');
	
	while(newsList.hasChildNodes()){
		newsList.removeChild('li');
	}
	//newsList.innerHTML = '';
	//e.preventDefault();
}

function update_page(clicked) {
	document.getElementById("home").style.backgroundColor="white";
	document.getElementById("top_entertainment").style.backgroundColor="white";
	document.getElementById("top_sports").style.backgroundColor="white";
	document.getElementById("top_technology").style.backgroundColor="white";
	
	document.getElementById("home").style.color="black";
	document.getElementById("top_entertainment").style.color="black";
	document.getElementById("top_sports").style.color="black";
	document.getElementById("top_technology").style.color="black";
	
	document.getElementById(clicked).style.backgroundColor= "rgb(53, 161, 223)";
	document.getElementById(clicked).style.color= "white";
}

function getSearch(e){
	update_page('home');
	newsList.innerHTML = '';
	e.preventDefault(); 			
				
	let searchedFor = input.value;
	
	let searchCategory = category.value; 		
	if(searchCategory == 'choose') { //handles no search category 
		document.getElementById("noCategory").style.display = "block";
	}else {
		document.getElementById("noCategory").style.display = "none";
		if(sortBy.value == 'choose') {
			sortBy.value = 'relevancy'; 
		}
		let sortPage = sortBy.value;
		
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
			let results = document.createElement('p'); 
			results.textContent = "Results: " + data.totalResults; 
			category.appendChild(results);
			
			if(data.totalResults == 0) {
				newsList.innerHTML = 'Could not find any results. Please adjust your search!';
			}else
			
			data.articles.forEach(article => {
				let li = document.createElement('li');
				let articleDiv = document.createElement('div');
				let articleText = document.createElement('div');//the text portion of the article 
				
				
				if(article.title != null) {
					let a = document.createElement('a');
					a.setAttribute('href', article.url);
					a.setAttribute('target', '_blank');
					a.textContent = article.title;
					articleText.appendChild(a);
				}
				

				let src = ''; 
				if (article.source.name != null) {
					src = 'Source: ' + article.source.name; 
				}
				
				let auth = ''; 
				if (article.author != null) {
					' | Author: ' + article.author;
				}
				
				let info = document.createElement('p');
				info.textContent = article.publishedAt + '| Source: ' + article.source.name + ' | Author: ' + article.author;
				
				let preview = document.createElement('p');
				preview.classList.add("previewText");
				preview.textContent = '' + article.description; 
				
				articleText.appendChild(info); 
				articleText.appendChild(preview); 
								
				let img = document.createElement('img');
				img.alt = "Icon for article";
				if(article.urlToImage == "") {
					img.src = "images/noImage.png"; 
				} else {
					img.src = article.urlToImage;
					console.log("success"); 
				}
				
				articleDiv.appendChild(articleText);
				articleDiv.appendChild(img);
				
				li.appendChild(articleDiv); 
								   
				newsList.appendChild(li);				
			})						
		});
	});
}
				
