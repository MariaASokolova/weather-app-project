function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${mins}`;
}

function showTemp(response) {
  let cityVal = document.querySelector("#city-name");
  cityVal.innerHTML = response.data.name;
  let tempVal = document.querySelector("#temp-val");
  tempVal.innerHTML = Math.round(response.data.main.temp);
  celTemp = Math.round(response.data.main.temp);
  let weatherDescr = document.querySelector("#weather-descr");
  weatherDescr.innerHTML = response.data.weather[0].description;
  let humVal = document.querySelector("#hum-val");
  humVal.innerHTML = response.data.main.humidity;
  let windVal = document.querySelector("#wind-val");
  windVal.innerHTML = Math.round(response.data.wind.speed);
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function showFarh(event) {
  event.preventDefault();
  celc.classList.remove("active");
  farh.classList.add("active");
  let farhVal = (celTemp * 9) / 5 + 32;
  let tempVal = document.querySelector("#temp-val");
  tempVal.innerHTML = Math.round(farhVal);
}

function showCelc(event) {
  event.preventDefault();
  celc.classList.add("active");
  farh.classList.remove("active");
  let tempVal = document.querySelector("#temp-val");
  tempVal.innerHTML = celTemp;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="day-for">${formatDay(forecastDay.dt)}</div>
              <div class="icon-for">
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                />
              </div>
              <div class="weather-for">${Math.round(
                forecastDay.temp.min
              )}° ${Math.round(forecastDay.temp.max)}°</div>
            </div>
          
          

        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let celTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let farh = document.querySelector("#Farh");
// farh.addEventListener("click", showFarh);

// let celc = document.querySelector("#Celc");
// celc.addEventListener("click", showCelc);
