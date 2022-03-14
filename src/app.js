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
}
let city = "Moscow";
let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
