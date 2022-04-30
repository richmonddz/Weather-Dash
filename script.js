var cityCon = document.querySelector("#citySearch");
var cityChoice = document.querySelector("#city-selection");
var mainWeather = document.querySelector("#weather-box");
var cityInpt = document.querySelector("#city");
var cityForecast = document.querySelector("#forecast");
var forcastBox = document.querySelector("#forecastBoxes");
var pastCities = document.querySelector("#prevCities");

var getWeather = function (city) {
  var apiKey = "7d0170c82115fd50125866009a57c3f4";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      showWeather(data, city);
    });
  });
};
