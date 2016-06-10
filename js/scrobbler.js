'use strict';
/// <reference path="jquery.d.ts" />
var IMAGE_SMALL = 0; // 34x34
var IMAGE_MEDIUM = 1; // 64x64
var IMAGE_LARGE = 2; // 174x174px
var IMAGE_EXTRALARGE = 3; // 300x300px
var Scrobbler = (function () {
    function Scrobbler() {
        this.method = 'user.getrecenttracks';
        this.apiKey = '2417947c57e2d0cde512441710dcb29f';
        this.format = 'json';
        this.apiUrl = 'http://ws.audioscrobbler.com/2.0/';
    }
    return Scrobbler;
}());
/**
 * @param any element
 */
var Chart = (function () {
    function Chart() {
        var chart = document.createElement('div');
        chart.className = "col s12";
        document.body.appendChild(chart);
        this.element = chart;
    }
    Chart.prototype.appendAlbum = function (album) {
        this.element.appendChild(album.element);
    };
    return Chart;
}());
/**
 *  @param any element
 *  @param string artist
 *  @param string name
 *  @param string image
 */
var Album = (function () {
    function Album(artist, name, image) {
        this.artist = artist;
        this.name = name;
        this.image = image;
    }
    Album.prototype.generateAlbumElement = function () {
        // Блок альбома
        var albumElement = document.createElement('div');
        albumElement.className = 'album center col row flow-text z-depth-2 ';
        // Блок названия
        var albumNameElement = document.createElement('div');
        albumNameElement.className = 'title s12 center row col'; // flow-text z-depth-2 
        albumNameElement.innerText = this.name + ' - ' + this.artist;
        albumElement.appendChild(albumNameElement);
        // Левая колонка
        var albumLogoElement = document.createElement('div');
        albumLogoElement.className = 'left-column s5 col';
        albumElement.appendChild(albumLogoElement);
        // Обложка
        var albumImgElement = document.createElement('img');
        albumImgElement.src = this.image;
        albumImgElement.className = 'logo circle responsive-img';
        albumLogoElement.appendChild(albumImgElement);
        // Правая колонка
        var trackListElement = document.createElement('div');
        trackListElement.className = 'right-column s7 col';
        this.trackListElement = trackListElement;
        albumElement.appendChild(trackListElement);
        this.element = albumElement;
    };
    Album.prototype.appendTrack = function (track) {
        this.trackListElement.appendChild(track.element);
    };
    return Album;
}());
/**
 *  @param any element
 *  @param string artist
 *  @param string name
 *  @param string image
 */
var Track = (function () {
    function Track(artist, album, name) {
        this.artist = artist;
        this.album = album;
        this.name = name;
    }
    Track.prototype.generateElement = function () {
        var trackElement = document.createElement('div');
        trackElement.className = 'track flow-text'; //right-column
        trackElement.innerText = this.name;
        this.element = trackElement;
    };
    return Track;
}());
document.addEventListener("DOMContentLoaded", function () {
    var chart = new Chart();
    var scrobbler = new Scrobbler();
    var ajaxParamsArray = {
        method: scrobbler.method,
        user: 'ihappiness',
        //todo а вот тут не забыть бы доделать
        limit: 30,
        from: 1433924359,
        to: 1435924359,
        api_key: scrobbler.apiKey,
        format: scrobbler.format
    };
    var ajaxParams = '?';
    for (var key in ajaxParamsArray) {
        ajaxParams += key + '=' + ajaxParamsArray[key] + '&';
    }
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', scrobbler.apiUrl + ajaxParams, true);
    ajaxRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    ajaxRequest.send();
    ajaxRequest.onload = function () {
        if (ajaxRequest.status >= 200 && ajaxRequest.status < 400) {
            // Success!
            var data = JSON.parse(ajaxRequest.responseText);
            var previousAlbum = '';
            for (var i = 0; i < data.recenttracks.track.length; i++) {
                var dataTrack = data.recenttracks.track[i];
                var track = new Track(dataTrack.artist['#text'], dataTrack.album['#text'], dataTrack.name);
                var album = null;
                if (track.album != previousAlbum) {
                    previousAlbum = track.album;
                    album = new Album(track.artist, track.album, dataTrack.image[IMAGE_EXTRALARGE]['#text']);
                    album.generateAlbumElement();
                    chart.appendAlbum(album);
                    chart.lastAlbum = album;
                }
                else {
                    album = chart.lastAlbum;
                }
                track.generateElement();
                album.appendTrack(track);
            }
        }
        else {
        }
    };
});
//# sourceMappingURL=scrobbler.js.map