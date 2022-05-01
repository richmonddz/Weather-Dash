var cityCon = document.querySelector("#citySearch");
var cityChoice = document.querySelector("#city-selection");
var mainWeather = document.querySelector("#weather-box");
var cityInpt = document.querySelector("#city");
var cityForecast = document.querySelector("#forecast");
var forecastBox = document.querySelector("#forecastBoxes");
var pastCities = document.querySelector("#prevCities");
var prevCities = [];

var getWeather = function (city) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7d0170c82115fd50125866009a57c3f4`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      dispWeather(data, city);
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

var runPage = function (event) {
  event.preventDefault();
  var city = cityChoice.value.trim();
  if (city) {
    getWeather(city);
    grab5for(city);
    prevCities.unshift({ city });
    cityChoice.value = "";
  } else {
    alert("Please select a valid city");
  }
  pastSearch();
  preSearch(city);
};

var grabUV = function (lat, lon) {
  var apiKey = "7d0170c82115fd50125866009a57c3f4";
  var url = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      showUV(data);
    });
  });
};

var showUV = function (index) {
  var UVdisp = document.createElement("div");
  UVdisp.textContent = "UV: ";
  UVdisp.classList = "list-group-item";

  uvIndexValue = document.createElement("span");
  uvIndexValue.textContent = index.value;

  if (index.value <= 2) {
    uvIndexValue.classList = "favorable";
  } else if (index.value > 2 && index.value <= 8) {
    uvIndexValue.classList = "moderate";
  } else if (index.value > 8) {
    uvIndexValue.classList = "severe";
  }

  UVdisp.appendChild(uvIndexValue);
  mainWeather.appendChild(UVdisp);
};

var grab5for = function (city) {
  var apiKey = "7d0170c82115fd50125866009a57c3f4";
  var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      display5Day(data);
    });
  });
};
var display5Day = function (weather) {
  forecastBox.textContent = "";
  cityForecast.textContent = "5-Day Forecast:";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var forecastElement = document.createElement("div");
    forecastElement.classList = "card bg-primary text-light m-2";

    var forecastDate = document.createElement("h5");
    forecastDate.textContent = moment
      .unix(dailyForecast.dt)
      .format("MMM D, YYYY");
    forecastDate.classList = "card-header text-center";
    forecastElement.appendChild(forecastDate);

    var weatherImg = document.createElement("img");
    weatherImg.classList = "card-body text-center";
    weatherImg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );

    forecastElement.appendChild(weatherImg);

    var forecast1 = document.createElement("span");
    forecast1.classList = "card-body text-center";
    forecast1.textContent = dailyForecast.main.temp + " °F";

    forecastElement.appendChild(forecast1);

    var forecastHumEl = document.createElement("span");
    forecastHumEl.classList = "card-body text-center";
    forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

    forecastElement.appendChild(forecastHumEl);
    forecastBox.appendChild(forecastElement);
  }
};
var preSearch = function (preSearch) {
  preSearch1 = document.createElement("button");
  preSearch1.textContent = preSearch;
  preSearch1.classList = "d-flex w-100 btn-light border p-2";
  preSearch1.setAttribute("data-city", preSearch);
  preSearch1.setAttribute("type", "submit");

  pastCities.prepend(preSearch1);
};

var pastSearchCities = function (event) {
  var city = event.target.getAttribute("data-city");
  if (city) {
    getWeather(city);
    grab5for(city);
  }
};

cityCon.addEventListener("submit", runPage);
pastCities.addEventListener("click", pastSearchCities);
