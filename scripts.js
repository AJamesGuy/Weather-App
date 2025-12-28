const search = document.getElementById('search');
const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const street = document.getElementById('street');
const postalCode = document.getElementById('postalcode');
const geocodeKey = '6950810907321789655968xnqe076a7';
const openWeatherKey = '242c6678d0c9a22d4a787e6c58f3d80e';


async function geocode() {
    const formattedStreet = street.value.replace(/ /g, '+');
    const formattedState = state.value.replace(/ /g, '+');
    const formattedCity = city.value
    const formattedPostalCode = postalCode.value
    const formattedCountry = country.value
    const response = await fetch(`https://geocode.maps.co/search?q=${formattedStreet}+${formattedCity}+${formattedState}+${formattedPostalCode}+${formattedCountry}&api_key=${geocodeKey}`)
    const data = await response.json()
    console.log(data[0].lat)
    console.log(data[0].lon)
    const coordinates = {
        latitude: data[0].lat,
        longitude: data[0].lon
    }
    return coordinates
    
}

const weatherDataDiv = document.getElementById('weather-data');

search.addEventListener('click', (async event => {
    event.preventDefault()
    const coordinates = await geocode()
    const lat = coordinates.latitude
    const lon = coordinates.longitude
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}`)
    const data = await response.json()
    const highToF = Math.round((data.main.temp_max * 1.8) - 459.67);
    const lowToF = Math.round((data.main.temp_min * 1.8) - 459.67);
    const weatherData = {
        forecast: data.weather[0].main,
        high: highToF,
        low: lowToF,
        humidity: data.main.humidity
    };
    weatherDataDiv.innerHTML = '';

    const forecastCard = document.createElement('div');
    forecastCard.className = 'weather-card';
    forecastCard.innerHTML = `<h3>Forecast</h3><p>${weatherData.forecast}</p>`;
    weatherDataDiv.appendChild(forecastCard);

    const highCard = document.createElement('div');
    highCard.className = 'weather-card';
    highCard.innerHTML = `<h3>High</h3><p>${weatherData.high}°F</p>`;
    weatherDataDiv.appendChild(highCard);

    const lowCard = document.createElement('div');
    lowCard.className = 'weather-card';
    lowCard.innerHTML = `<h3>Low</h3><p>${weatherData.low}°F</p>`;
    weatherDataDiv.appendChild(lowCard);

    const humidityCard = document.createElement('div');
    humidityCard.className = 'weather-card';
    humidityCard.innerHTML = `<h3>Humidity</h3><p>${weatherData.humidity}%</p>`;
    weatherDataDiv.appendChild(humidityCard);
}));




