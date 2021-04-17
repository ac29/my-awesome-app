//Challenge 1
function formatDate() {
  let now = new Date();
  let date = now.getDate();
  let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
  let minute = now.getMinutes();
   if  (minute < 10) { 
       minute = `0${minute}`;
  }
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let formattedDate = `${day}, ${month} ${date}, ${year} ${hour}:${minute}`;
  return formattedDate;
}

function citysearch(event) {
  event.preventDefault();
let cityInput = document.querySelector("#city-input");
let cityElemnet = document.querySelector ("#city");
cityElemnet.innerHTML=`${cityInput.value}`;
let apiKey = "7dd7f2137e6eaf2096f115b990d86b79";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl}`).then(showTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let farenheitTemperature = document.querySelector ("#temperature");
  let temperature = farenheitTemperature.innerHTML;
  farenheitTemperature.innerHTML = Math.round ((temperature * 9)/ 5 + 32 );
}

function convertToCelcius(event) {
    event.preventDefault();
    let celciusTemperature = document.querySelector ("#temperature");
    let temperature = celciusTemperature.innerHTML
    celciusTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

function showCurrentCity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = `${cityName}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round (response.data.wind.speed);
  let temperatureElement = document.querySelector("#temperature");
  let windspeedElement = document.querySelector ("#windspeed"); 
  let humidityElement = document.querySelector("#humidity"); 
  let weatherDescriptionElement = document.querySelector ("#weather-description");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${temperature}`;
  windspeedElement.innerHTML = `${windspeed}`;
  humidityElement.innerHTML = response.data.main.humidity;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "7dd7f2137e6eaf2096f115b990d86b79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
  axios.get(`${apiUrl}`).then(showCurrentCity);
}

function getPosition (event) {
     event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


let now = new Date();
let dateFunction = document.querySelector("#date");
dateFunction.innerHTML = formatDate();

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", citysearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelcius);

let currentButton = document.querySelector ("#current-button");
currentButton.addEventListener("click", getPosition);

