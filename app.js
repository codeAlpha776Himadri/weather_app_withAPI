const _region = document.querySelector('.current-location-place');
const _state = document.querySelector('.current-location-state');
const _country = document.querySelector('.current-location-country');

const updated_time = document.querySelector('.updated-time-value');

const precipitation_field = document.querySelector('.rain-details');
const humidity_field = document.querySelector('.humidity-details');
const windDirection_field = document.querySelector('.wind-details');
const pressure_field = document.querySelector('.pressure-details');

const temperature_field = document.querySelector('.temperature-value');
const C_F = document.querySelector('.C-F');

// const condition = document.querySelector('.icon');

window.addEventListener('load', () => {
    navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const weatherApi = `${proxy}http://api.weatherapi.com/v1/current.json?key=39f322824a244aa5b8964602210208&q=${lat},${lon}&aqi=no`;

        fetch(weatherApi)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let temp_in_degree_celcius = data.current.temp_c;
                console.log(temp_in_degree_celcius);
                let place = data.location.name;
                let state = data.location.region;
                let country = data.location.country;

                _region.textContent = place;
                _state.textContent = state;
                _country.textContent = country;

                updated_time.textContent = data.current.last_updated;

                precipitation_field.textContent = data.current.precip_mm;
                humidity_field.textContent = data.current.humidity;
                windDirection_field.textContent = data.current.wind_dir;
                pressure_field.textContent = data.current.pressure_mb;

                temperature_field.textContent = data.current.temp_c;
                // C_F.textContent = '°C';

                function changeValue() {
                    if (C_F.textContent == '°C') {
                        C_F.textContent = 'F';
                        temperature_field.textContent = data.current.temp_f;
                    } else {
                        C_F.textContent = '°C';
                        temperature_field.textContent = data.current.temp_c;
                    }
                }

                function set_weather_details() {

                }
                set_weather_details();

                temperature_field.addEventListener('click', changeValue);

                // set_icons(data.current.condition.text ,document.querySelector('.icon'));
                var skycons = new Skycons({ "color": "white" });
                skycons.add(document.getElementById("icon"), Skycons.RAIN);
                skycons.play();

                console.log(data)

            });
    });

    // function set_icons(icon, iconID) {
    //     const skycons  = new Skycons({color : "white"});
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    //     skycons.play();
    //     return skycons.set(iconID, skycons[currentIcon])
    // }

});


