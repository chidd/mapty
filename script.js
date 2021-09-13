'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// test if geolocation feature is available in the case of old browers
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        const {latitude} = position.coords;//using obj destructuring to access latitude prop
        const {longitude} = position.coords;//using obj destructuring to access longitude prop
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude,longitude];

        //  create and load a map using leaflet.js
        var map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    },
    function(){
        alert("Couldn't get your current position");
    });