const longitude = document.getElementById('longitude');
const latitude = document.getElementById('latitude');
const search = document.getElementById('search');
const body = document.querySelector('body');
const openWeatherKey = '84edb5205e29d6d9bf3ea01c26ef407a'
const geocodeKey = '6950810907321789655968xnqe076a7'

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





