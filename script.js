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


class App {
    #map;
    #mapEvent;

    constructor(){
        this._getPosition();

        // Handle form submit
        form.addEventListener('submit',this._newWorkout.bind(this));

        inputType.addEventListener('change',this._toggleElevationField);
    }

    _getPosition(){
        // test if geolocation feature is available in the case of old browers
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
            function(){
                alert("Couldn't get your current position");
            });
    }

    _loadMap(position){
        const {latitude} = position.coords;//using obj destructuring to access latitude prop
        const {longitude} = position.coords;//using obj destructuring to access longitude prop
        
        const coords = [latitude,longitude];
        
        // load a map using leaflet.js
        this.#map = L.map('map').setView(coords, 13);
        // console.log(this);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        
        
        // handle click event using leaflet.js special on method on the map object created using leaflet
        this.#map.on('click',this._showForm.bind(this));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;            
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
            e.preventDefault();

            // clear input field
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value ='';
            // Display the marker        
            const {lat,lng} = this.#mapEvent.latlng;// object destructuring used to get lat and lng values

            L.marker([lat,lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose:false,
                closeOnClick:false,
                className:'running-popup'
            }))
            .setPopupContent('Workout Location')
            .openPopup();
    }
}


const app = new App();