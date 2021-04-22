
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

function citysearch(city) {
let cityInput = document.querySelector("#city-input");
let cityElemnet = document.querySelector ("#city");
cityElemnet.innerHTML=`${cityInput.value}`;
let apiKey = "7dd7f2137e6eaf2096f115b990d86b79";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl}`).then(showTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemperature = document.querySelector ("#temperature");
  let temperature = celsiusTemperature;
  farenheitTemperature.innerHTML = Math.round ((temperature * 9)/ 5 + 32 );
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showCurrentCity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = `${cityName}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
   forecast.forEach(function (forecastDay,index) {
     if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°  </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
  }
}
);

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }


function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "7dd7f2137e6eaf2096f115b990d86b79";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let windspeed = Math.round (response.data.wind.speed);
  let temperatureElement = document.querySelector("#temperature");
  let windspeedElement = document.querySelector ("#windspeed"); 
  let humidityElement = document.querySelector("#humidity"); 
  let weatherDescriptionElement = document.querySelector ("#weather-description");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${temperature}`;
  windspeedElement.innerHTML = `${windspeed}`;
  humidityElement.innerHTML = response.data.main.humidity;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

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
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

let currentButton = document.querySelector ("#current-button");
currentButton.addEventListener("click", getPosition); 

getPosition();