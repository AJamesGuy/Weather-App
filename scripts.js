const search = document.getElementById('search');
const body = document.querySelector('body');
const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const street = document.getElementById('street')
import { geocodeKey } from './api.js';
import { openWeatherKey } from './api.js';



async function geocode() {
    const response = await fetch(`https://geocode.maps.co/search?q=New+York+NY+US&api_key=${geocodeKey}`)
    const data = await response.json()
    console.log(data[0].lat)
    console.log(data[0].lon)
    const coordinates = {
        latitude: data[0].lat,
        longitude: data[0].lon
    }
    return coordinates

}


search.addEventListener('click', (async event => {
    event.preventDefault()
    await geocode()
    const lat = latitude.value
    const lon = longitude.value
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherKey}`)
    const data = await response.json()
    const highToF = (data.main.temp_max * 1.8) - 459.67;
    const lowToF = (data.main.temp_min * 1.8) - 459.67;
    const weatherData = {
        forecast: data.weather[0].main,
        high: highToF,
        low: lowToF,
        humidity: data.main.humidity
    }
    console.log(weatherData)
    return weatherData
}));


// document.addEventListener('click', (event =>{
//     if (event.target.id === 'search'){
//         const div = document.createElement('div');
//         div.innerHTML = `<h3>Forecast:</h3>
//                         <p>${weatherData.forecast}</p>
//                         <h3>`
//     }
// }))





