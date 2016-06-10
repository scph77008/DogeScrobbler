'use strict';
/// <reference path="jquery.d.ts" />
const IMAGE_SMALL = 0; // 34x34
const IMAGE_MEDIUM = 1; // 64x64
const IMAGE_LARGE = 2; // 174x174px
const IMAGE_EXTRALARGE = 3; // 300x300px

class Scrobbler
{
	method:string;
	apiKey:string;
	format:string;
	apiUrl:string;

	constructor()
	{
		this.method = 'user.getrecenttracks';
		this.apiKey = '2417947c57e2d0cde512441710dcb29f';
		this.format = 'json';
		this.apiUrl = 'http://ws.audioscrobbler.com/2.0/';
	}

}

/**
 * @param any element
 */
class Chart
{
	element:any;
	lastAlbum:Album;

	constructor()
	{
		let chart = document.createElement('div');
		chart.className = "col s12";
		document.body.appendChild(chart);
		this.element = chart;
	}

	appendAlbum(album:Album)
	{
		this.element.appendChild(album.element);
	}

}
/**
 *  @param any element
 *  @param string artist
 *  @param string name
 *  @param string image
 */
class Album
{
	element:any;
	trackListElement:any;
	artist:string;
	name:string;
	image:string;

	constructor(artist:string, name:string, image:string)
	{
		this.artist = artist;
		this.name = name;
		this.image = image;
	}

	generateAlbumElement()
	{
		// Блок альбома
		let albumElement = document.createElement('div');
		albumElement.className = 'album center col row flow-text z-depth-2 ';

		// Блок названия
		let albumNameElement = document.createElement('div');
		albumNameElement.className = 'title s12 center row col'; // flow-text z-depth-2 
		albumNameElement.innerText = this.name + ' - ' + this.artist;
		albumElement.appendChild(albumNameElement);

		// Левая колонка
		let albumLogoElement = document.createElement('div');
		albumLogoElement.className = 'left-column s5 col';
		albumElement.appendChild(albumLogoElement);

		// Обложка
		let albumImgElement = document.createElement('img');
		albumImgElement.src = this.image;
		albumImgElement.className = 'logo circle responsive-img';
		albumLogoElement.appendChild(albumImgElement);

		// Правая колонка
		let trackListElement = document.createElement('div');
		trackListElement.className = 'right-column s7 col';
		this.trackListElement = trackListElement;
		albumElement.appendChild(trackListElement);

		this.element = albumElement;
	}

	appendTrack(track)
	{
		this.trackListElement.appendChild(track.element);
	}
}
/**
 *  @param any element
 *  @param string artist
 *  @param string name
 *  @param string image
 */
class Track
{
	element:any;
	artist:string;
	album:string;
	name:string;

	constructor(artist, album, name)
	{
		this.artist = artist;
		this.album = album;
		this.name = name;
	}

	generateElement()
	{
		let trackElement = document.createElement('div');
		trackElement.className = 'track flow-text'; //right-column
		trackElement.innerText = this.name;

		this.element = trackElement;
	}
}

document.addEventListener("DOMContentLoaded", function ()
{
	let chart = new Chart();
	let scrobbler = new Scrobbler();

	let ajaxParamsArray = {
		method : scrobbler.method,
		user   : 'ihappiness',
		//todo а вот тут не забыть бы доделать
		limit  : 30,
		from   : 1433924359,
		to     : 1435924359,
		api_key: scrobbler.apiKey,
		format : scrobbler.format
	};

	let ajaxParams = '?';
	for (var key in ajaxParamsArray)
	{
		ajaxParams += key + '=' + ajaxParamsArray[key] + '&';
	}

	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.open('GET', scrobbler.apiUrl + ajaxParams, true);
	ajaxRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	ajaxRequest.send();

	ajaxRequest.onload = function ()
	{
		if (ajaxRequest.status >= 200 && ajaxRequest.status < 400)
		{
			// Success!
			var data = JSON.parse(ajaxRequest.responseText);
			let previousAlbum = '';
			for (var i = 0; i < data.recenttracks.track.length; i++)
			{
				let dataTrack = data.recenttracks.track[i];
				let track = new Track(dataTrack.artist['#text'], dataTrack.album['#text'], dataTrack.name);

				let album = null;
				if (track.album != previousAlbum) // Новый альбом
				{
					previousAlbum = track.album;

					album = new Album(track.artist, track.album, dataTrack.image[IMAGE_EXTRALARGE]['#text']);
					album.generateAlbumElement();
					chart.appendAlbum(album);
					chart.lastAlbum = album;
				}
				else
				{
					album = chart.lastAlbum;
				}
				track.generateElement();
				album.appendTrack(track);
			}

		}
		else
		{
			// We reached our target server, but it returned an error
		}
	}

});
