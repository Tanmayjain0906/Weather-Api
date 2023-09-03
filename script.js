
let apiKey = "6897049bd3a7b5aabf5cbd589426ebf0";

const fetchBtn = document.getElementById("fetch-btn");

let modal = document.getElementsByClassName("modal")[0];

fetchBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        let { latitude, longitude } = position.coords;
        // console.log(latitude);
        // console.log(longitude);

        modal.style.display = "none";

        addDataToUI(latitude, longitude);
    }

    function onError(error) {
        alert(error.message);
    }
})

function addDataToUI(lat, long) {
    let latBtn = document.getElementById("lat-btn");
    let longBtn = document.getElementById("long-btn");

    let mapContainer = document.getElementsByClassName("map-container")[0];

    latBtn.innerText = `Lat: ${lat}`;
    longBtn.innerText = `Long: ${long}`;

    mapContainer.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="360"
    height="270" frameborder="0" style="border:0"></iframe>`

    OpenWeatherMap(lat, long);
}

async function OpenWeatherMap(lat, long) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

    let response = await fetch(url);
    let data = await response.json();

    //    console.log(data);
    addDataToWeatherUI(data);
}

function addDataToWeatherUI(data) {
    const weatherData = document.getElementsByClassName("data-btn")[0];

    weatherData.innerHTML = `<button class="btn">Location: ${data.name}</button>

    <button class="btn">Wind Speed: ${convertWindSpeedToKmph(data.wind.speed)}Kmph</button>

    <button class="btn">Humidity: ${data.main.humidity}</button>

    <button class="btn">Time Zone: ${new Date().toUTCString()}</button>

    <button class="btn">Pressure: ${mmHgToAtm(data.main.pressure)}atm</button>

    <button class="btn">Wind Direction: ${getDirection(data.wind.deg)}</button>

    <button class="btn">UV Index: 423</button> 

    <button class="btn">Feels like: ${data.main.feels_like}°</button>`
}



function getDirection(degrees) {
    // Define compass directions and their degree ranges
    const directions = [
        { name: "North", min: 0, max: 22.5 },
        { name: "North-East", min: 22.5, max: 67.5 },
        { name: "East", min: 67.5, max: 112.5 },
        { name: "South-east", min: 112.5, max: 157.5 },
        { name: "South", min: 157.5, max: 202.5 },
        { name: "South-West", min: 202.5, max: 247.5 },
        { name: "West", min: 247.5, max: 292.5 },
        { name: "North-West", min: 292.5, max: 337.5 },
        { name: "North", min: 337.5, max: 360 },
    ];

    // Find the compass direction for the given degrees
    for (const direction of directions) {
        if (degrees >= direction.min && degrees < direction.max) {
            return direction.name;
        }
    }

    // If the input is out of range (e.g., degrees > 360), return an error message
    return "Invalid Input";
}


function mmHgToAtm(mmHg) {
    let atm = mmHg / 760;
    return atm.toFixed(2);
}

function convertWindSpeedToKmph(windSpeedMps) {
    // 1 m/s is approximately equal to 3.6 km/h
    const windSpeedKmph = windSpeedMps * 3.6;
    return windSpeedKmph.toFixed(2);
}
// Note: UV index is now a part of one call api which we need to buy subscription.