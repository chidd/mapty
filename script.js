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

        const {latitude} = position.coords;//using obj destructuring to access latitude prop
        const {longitude} = position.coords;//using obj destructuring to access longitude prop
        
        const coords = [latitude,longitude];

        //  create and load a map using leaflet.js
        var map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        
        // handle click event using leaflet.js special on method on the map object created using leaflet
        map.on('click',function (mapEvent) {
            // object destructuring used to get lat and lng values
            const {lat,lng} = mapEvent.latlng;

            L.marker([lat,lng]).addTo(map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose:false,
                closeOnClick:false,
                className:'running-popup'
            }))
            .setPopupContent('Workout Location')
            .openPopup();
            console.log(lat,lng);
        });
    },
    function(){
        alert("Couldn't get your current position");
    });