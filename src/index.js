//current date in center of page
function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayNow = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthNow = months[now.getMonth()];
  let dateNow = now.getDate();
  let hourNow = now.getHours();
  if (hourNow < 10) {
    hourNow = `0${hourNow}`;
  }
  let minNow = now.getMinutes();
  if (minNow < 10) {
    minNow = `0${minNow}`;
  }
  return `${dayNow}, ${monthNow} ${dateNow} at ${hourNow}:${minNow}`;
}

let date = document.querySelector("#currentDate");
let now = new Date();
date.innerHTML = formatDate(now);

//searched city weather conditions should be displayed

function showTemp(response) {
  console.log(response);
  let searchCity = document.querySelector("#currentCityName");
  searchCity.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#metricT");
  temperatureElement.innerHTML = `${temperature}˚C`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let maxTemp = document.querySelector("#highTemp");
  maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}˚C`;

  let minTemp = document.querySelector("#lowTemp");
  minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}˚C`;

  let feelsLike = document.querySelector("#feelsTemp");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}˚C`;
}

//let submitForm = document.querySelector(".form-inline");
//submitForm.addEventListener("submit", showTemp);
function searchedCity(city) {
  let apiKey = "47946c44662c2450dc8f43f4b76c1cb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchedCity(city);

  let searchInput = document.querySelector("#searchInput");
  let currentCity = document.querySelector("#currentCityName");

  if (searchInput.value) {
    currentCity.innerHtml = `${searchInput.value}`;
  } else {
    currentCity.innerHTML = null;
    alert("Please enter a city name.");
  }
}
let submitForm = document.querySelector(".form-inline");
submitForm.addEventListener("submit", submitSearch);

//display current location by coordinates
function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}
function currentLocationBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#locationBtn");
currentLocation.addEventListener("click", currentLocationBtn);

//change fahrenheit button and the math conversion for later
function changeUnitsF(event) {
  let fahrenheit = document.querySelector(".currentTemp");
  fahrenheit.innerHTML = `${Math.round(temperature * 9) / 5 + 32}˚F`;
}

let changeUnitFBtn = document.querySelector(".changeUnitF");
changeUnitFBtn.addEventListener("click", changeUnitsF);

//back to metric
function changeUnitsM(event) {
  let metric = document.querySelector("#metricT");
  metric.innerHTML = "17˚C";
}

let changeUnitMBtn = document.querySelector(".changeUnitM");
changeUnitMBtn.addEventListener("click", changeUnitsM);
