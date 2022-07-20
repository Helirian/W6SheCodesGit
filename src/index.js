let currentTime = new Date();

function formatDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let currentDay = days[date.getDay()];
    let currentHours = date.getHours();
    if (currentHours < 10) {
        currentHours = "0" + currentHours;
    }
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
    let currentDate = date.getDate();
    let formattedDate = `It is ${currentDay}, ${currentHours}:${currentMinutes}`;
    let showTime = document.querySelector("#current-time");
    showTime.innerHTML = formattedDate;
}
console.log(formatDate(currentTime));

function showTemperature(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temp-value").innerHTML = Math.round(
        response.data.main.temp
    );
}

function searchCity(city) {
    let apiKey = "81c95f81174bafa543a7ffc89b06ec2a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function goToSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "81c95f81174bafa543a7ffc89b06ec2a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

function changeToFarin(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-value");
    temperatureElement.innerHTML = 66;
}

function changeToCels(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp-value");
    temperatureElement.innerHTML = 19;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", goToSubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");