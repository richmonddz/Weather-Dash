var cityCon = document.querySelector("#citySearch");
var cityChoice = document.querySelector("#city-selection");
var mainWeather = document.querySelector("#weather-box");
var cityInpt = document.querySelector("#city");
var cityForecast = document.querySelector("#forecast");
var forcastBox = document.querySelector("#forecastBoxes");
var pastCities = document.querySelector("#prevCities");
var prevCities = [];

var getWeather = function (city) {
  var apiKey = "7d0170c82115fd50125866009a57c3f4";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      showWeather(data, city);
    });
  });
};
var pastSearch = function () {
  localStorage.setItem("prevCities", JSON.stringify(prevCities));
};

var dispWeather = function (weather, searchCity) {
  mainWeather.textContent = "";
  cityInpt.textContent = searchCity;

  var today = document.createElement("span");
  today.textContent =
    "(" + moment(weather.dt.value).format("MMM D, YYYY") + ")";
  cityInpt.appendChild(today);

  var weatherSym = document.createElement("img");
  weatherSym.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  cityInpt.appendChild(weatherSym);

  var temp = document.createElement("span");
  temp.textContent = "Temperature: " + weather.main.temp + " °F";
  temp.classList = "list-group-item";

  var humidity = document.createElement("span");
  humidity.textContent = "Humidity: " + weather.main.humidity + " %";
  humidity.classList = "list-group-item";

  var wind = document.createElement("span");
  wind.textContent = "Wind Speed: " + weather.wind.speed + "mph";
  wind.classList = "list-group-item";

  mainWeather.appendChild(temp);
  mainWeather.appendChild(humidity);
  mainWeather.appendChild(wind);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  grabUV(lat, lon);
};

var grabUV = function (lat, lon) {
  var apiKey = "7d0170c82115fd50125866009a57c3f4";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url).then(function (response) {
    response.JSON().then(function (data) {
      showUV(data);
    });
  });
};
var showUV;
