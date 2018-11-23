/* 1. Search */

var UI = {};

UI.EnterPress = function() {
	
	document.querySelector(".js-search").addEventListener('keyup',function(e){
		
		
		var input = document.querySelector('input').value;
		console.log(input);

		if(e.which === 13) {    	
			SoundCloudAPI.clearTracks();
			SoundCloudAPI.getTrack(input);
	    	return;
	    }
	});
}

UI.EnterPress();

UI.SubmitClick = function() {
	
	document.querySelector(".js-submit").addEventListener('click',function(e){
		
		SoundCloudAPI.clearTracks();
	    var input = document.querySelector("input").value;
	    console.log(input);
	    SoundCloudAPI.getTrack(input);
	});
}

UI.SubmitClick();

UI.ClearPlaylist = function () {

	document.querySelector(".js-clear-playlist").addEventListener('click',function(e){
		SoundCloudAPI.clearEmbed();
	})
}

UI.ClearPlaylist();

/* 2. Query soundcloud API */


var SoundCloudAPI = {};

SoundCloudAPI.init = function() {

	SC.initialize({
	  client_id: 'cd9be64eeb32d1741c17cb39e41d254d',
	  // redirect_uri: 'file:///Users/Mark/Desktop/OneMonth/JS/wk3/SoundCloudPlayer/index.html'
	});

}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {

	// find all sounds of buskers licensed under 'creative commons share alike'
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) { // then = a promise
	  console.log(tracks);
	  SoundCloudAPI.renderTracks(tracks);
	});

}

/* 3. Display the cards */

SoundCloudAPI.renderTracks = function(tracks) {

	tracks.forEach(function(track) {
		console.log(track);

		//card
		var card = document.createElement('div');
		card.classList.add('card');

		//image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'https://i1.sndcdn.com/avatars-000131869186-my9qya-t500x500.jpg';

		//content
		var content = document.createElement("div");
	    content.classList.add('content');

		var header = document.createElement("div");
	    header.classList.add('header');
	    header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';

	    //button
	    var button = document.createElement('div');
	    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

	    var icon = document.createElement('i');
	    icon.classList.add('add', 'icon');

	    var buttonText = document.createElement('span');
	    buttonText.innerHTML = 'Add to playlist';

	    var buttonComment = document.createElement('span');
	    buttonComment.innerHTML = 'Comment!';

	    //appendChild
	    content.appendChild(header);

	    imageDiv.appendChild(image_img);

	    button.appendChild(icon);
	    button.appendChild(buttonText);

	    button.addEventListener('click', function(){
	    	console.log('click');
	    	SoundCloudAPI.getEmbed(track.permalink_url )
	    });

	    buttonComment.addEventListener('click', function(){
	    	window.prompt("sometext","defaultText");
	    	SoundCloudAPI.getEmbed(track.permalink_url )
	    });

	    card.appendChild(imageDiv);
	    card.appendChild(content);
	    card.appendChild(button);
	    // card.appendChild(buttonComment);

		var searchResults = document.querySelector(".js-search-results");
		searchResults.appendChild(card);
	})
}

SoundCloudAPI.clearTracks = function() {
	var searchResults =  document.querySelector(".js-search-results");
	searchResults.innerHTML = "";

}

/* 4. Add to playlist and play */

SoundCloudAPI.getEmbed = function(track_url) {
	SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
	  console.log('oEmbed response: ', oEmbed);
	  
	  var sideBar = document.querySelector('.js-playlist');

	  var box = document.createElement('div');
	  box.innerHTML = oEmbed.html;

	  sideBar.insertBefore(box, sideBar.firstChild.nextSibling);
	  localStorage.setItem("key",sideBar.innerHTML)

});
}

SoundCloudAPI.clearEmbed = function (track_url) {
	
	var sideBar = document.querySelector('.js-playlist');
	sideBar.innerHTML = ""
	localStorage.clear();
}

var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");


UI.getCatFact = function () {
	get("https://cat-fact.herokuapp.com/facts/random?animal=cat&amount=1")

}

