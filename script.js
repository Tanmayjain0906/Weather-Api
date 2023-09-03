
let apiKey = "6897049bd3a7b5aabf5cbd589426ebf0";

// navigator.geolocation.getCurrentPosition(onSuccess, onError);

// async function onSuccess(position)
// {
//     let {latitude, longitude} = position.coords;
//     console.log(latitude);
//     console.log(longitude);

//     let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
//     let result = await fetch(weatherUrl);
//     let data = await result.json();
//     console.log(data);
// }

// function onError(error)
// {
//     console.log(error);
// }



// async function fetchWeatherData(lat, lon) {
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
//     let response = await fetch(url, { method: "GET" });
  
//     let result = await response.json();
  
//     console.log(result);
//   }
  
//   function getGeoLocation() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         let lat = position.coords.latitude;
//         let lon = position.coords.longitude;
//         fetchWeatherData(lat, lon);
//       },
//       (error) => {
//         alert(error.message);
//       }
//     );
//   }
  
//   getGeoLocation();

const fetchBtn = document.getElementById("fetch-btn");

let modal = document.getElementsByClassName("modal")[0];

fetchBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position)
    {
        let {latitude, longitude} = position.coords;
        console.log(latitude);
        console.log(longitude);

        modal.style.display = "none";

        addDataToUI(latitude, longitude);
    }

    function onError(error)
    {
        alert(error.message);
    }
})

function addDataToUI(lat,long)
{
    let latBtn = document.getElementById("lat-btn");
    let longBtn = document.getElementById("long-btn");

    let mapContainer = document.getElementsByClassName("map-container")[0];

    latBtn.innerText = `Lat: ${lat}`;
    longBtn.innerText = `Long: ${long}`;

    mapContainer.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="360"
    height="270" frameborder="0" style="border:0"></iframe>`

    fetchWeatherData(lat, long);
}

async function fetchWeatherData(lat, long)
{
   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

   let response = await fetch(url);
   let data = await response.json();

   console.log(data);
   addDataToWeatherUI(data);
}

function addDataToWeatherUI(data)
{
    const weatherData = document.getElementsByClassName("data-btn")[0];

    weatherData.innerHTML = `<button class="btn">Location: ${data.name}</button>

    <button class="btn">Wind Speed: ${data.wind.speed}Kmph</button>

    <button class="btn">Humidity: ${data.main.humidity}</button>

    <button class="btn">Time Zone: GMT +${new Date(data.timezone).toUTCString()}</button>

    <button class="btn">Pressure: ${mmHgToAtm(data.main.pressure)}atm</button>

    <button class="btn">Wind Direction: ${getDirection(data.wind.deg)}</button>

    <button class="btn">UV Index: 500</button>

    <button class="btn">Feels like: ${data.main.feels_like}°</button>`
}

var directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"]

function getDirection(heading) {
   var index = Math.round((heading/8)/5,625)
   return directions[index]
}


function mmHgToAtm(mmHg) {
    let atm = mmHg / 760;
    return atm.toFixed(2);
  }