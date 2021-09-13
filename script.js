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

let map, mapEvent;

// test if geolocation feature is available in the case of old browers
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){

        const {latitude} = position.coords;//using obj destructuring to access latitude prop
        const {longitude} = position.coords;//using obj destructuring to access longitude prop
        
        const coords = [latitude,longitude];

        // load a map using leaflet.js
        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        
        
        // handle click event using leaflet.js special on method on the map object created using leaflet
        map.on('click',function (mapE) {
            mapEvent = mapE;            
            form.classList.remove('hidden');
            inputDistance.focus();


        });
    },
    function(){
        alert("Couldn't get your current position");
    });

    // Handle form submit
    form.addEventListener('submit',function(e){
        e.preventDefault();

        // clear input field
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value ='';
        // Display the marker        
        const {lat,lng} = mapEvent.latlng;// object destructuring used to get lat and lng values

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
    });

    inputType.addEventListener('change',function(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });