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
}

let apiKey = "15132c0c33ce6e6df2635ad5416e41db";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);
