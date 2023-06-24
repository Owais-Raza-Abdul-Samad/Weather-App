let locationCity = document.querySelector(".location-city");
let tempDisplay = document.querySelector(".top-temp-display");
let temperature = document.querySelector(".temperature");
let weatherImage = document.querySelector("#weather-image");
let weatherText = document.querySelector(".weather");
let searchBar = document.querySelector("#search-bar");
let loader = document.querySelector(".loader");
let sections = document.querySelectorAll("section");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let clouds = document.querySelector("#clouds");

console.log(sections)

let loadAtFirst = () => {
    navigator.geolocation.getCurrentPosition((location) => {
        let lat = location.coords.latitude
        let lon = location.coords.longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e43e5bd258a8091ea104a9b63d237eb5&units=metric`)
            .then(response => response.json())
            .then(response => {
                loader.style.display = "none";
                sections.forEach((sect) => {
                    sect.style.display = "flex";
                })
                console.log(response)
                locationCity.innerHTML = response.name;
                temperature.innerHTML = `${Math.round(response.main.temp)}°`;
                weatherText.innerHTML = response.weather[0].main

                if (response.weather[0].icon == "01d" || response.weather[0].icon == "01n") {
                    weatherImage.src = "assets/weather-clear.png";
                    tempDisplay.style.backgroundImage = "url('assets/clear-sky weather 1.gif')";
                } else if (response.weather[0].icon == "02d" || response.weather[0].icon == "02n") {
                    weatherImage.src = "assets/weather-few-clouds.png";
                    tempDisplay.style.backgroundImage = "url('assets/few-clouds weather.gif')";
                } else if (response.weather[0].icon == "03d" || response.weather[0].icon == "03n" || response.weather[0].icon == "04d" || response.weather[0].icon == "04n") {
                    weatherImage.src = "assets/weather-cloud.png";
                    tempDisplay.style.backgroundImage = "url('assets/cloudy weather.gif')";
                } else if (response.weather[0].icon == "09d" || response.weather[0].icon == "09n" || response.weather[0].icon == "10d" || response.weather[0].icon == "10n") {
                    weatherImage.src = "assets/weather-rain.png";
                    tempDisplay.style.backgroundImage = "url('assets/rainy weather.gif')";
                } else if (response.weather[0].icon == "11d" || response.weather[0].icon == "11n") {
                    weatherImage.src = "assets/weather-thunder.png";
                    tempDisplay.style.backgroundImage = "url(assets/thunderstorm weather.gif)";
                } else if (response.weather[0].icon == "13d" || response.weather[0].icon == "13n") {
                    weatherImage.src = "assets/weather-snow.png";
                    tempDisplay.style.backgroundImage = "url(assets/snowy weather.gif)";
                } else if (response.weather[0].icon == "50d" || response.weather[0].icon == "50n") {
                    weatherImage.src = "assets/weather-dust.png";
                    tempDisplay.style.backgroundImage = "url(assets/mist weather.gif)";
                }

                humidity.innerHTML = `${response.main.humidity}%`
                clouds.innerHTML = `${response.clouds.all}%`
                wind.innerHTML = `${response.wind.speed}km/h`

            })
            .catch(err => {
                console.log(err)
                swal({
                    icon: 'error',
                    title: 'Unable to Fetch Current Location Data',
                    text: 'Please enable your location',
                    button: "OK"
                })
            })
    })
}
loadAtFirst()

searchBar.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        getAndShowUserCityWeather()
    }
})

let getAndShowUserCityWeather = () => {
    if (searchBar.value.trim() == "") {
        swal({
            icon: 'error',
            title: 'Invalid City Name',
            text: 'Please enter valid city name',
            button: "OK"
        })
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=e43e5bd258a8091ea104a9b63d237eb5&units=metric`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                locationCity.innerHTML = response.name || "Not Provided";
                temperature.innerHTML = `${Math.round(response.main.temp)}°`;
                weatherText.innerHTML = response.weather[0].main

                if (response.weather[0].icon == "01d" || response.weather[0].icon == "01n") {
                    weatherImage.src = "assets/weather-clear.png";
                    tempDisplay.style.backgroundImage = "url('assets/clear-sky weather 1.gif')";
                } else if (response.weather[0].icon == "02d" || response.weather[0].icon == "02n") {
                    weatherImage.src = "assets/weather-few-clouds.png";
                    tempDisplay.style.backgroundImage = "url('assets/few-clouds weather.gif')";
                } else if (response.weather[0].icon == "03d" || response.weather[0].icon == "03n" || response.weather[0].icon == "04d" || response.weather[0].icon == "04n") {
                    weatherImage.src = "assets/weather-cloud.png";
                    tempDisplay.style.backgroundImage = "url('assets/cloudy weather.gif')";
                } else if (response.weather[0].icon == "09d" || response.weather[0].icon == "09n" || response.weather[0].icon == "10d" || response.weather[0].icon == "10n") {
                    weatherImage.src = "assets/weather-rain.png";
                    tempDisplay.style.backgroundImage = "url('assets/rainy weather.gif')";
                } else if (response.weather[0].icon == "11d" || response.weather[0].icon == "11n") {
                    weatherImage.src = "assets/weather-thunder.png";
                    tempDisplay.style.backgroundImage = "url('assets/thunderstorm weather.gif')";
                } else if (response.weather[0].icon == "13d" || response.weather[0].icon == "13n") {
                    weatherImage.src = "assets/weather-snow.png";
                    tempDisplay.style.backgroundImage = "url('assets/snowy weather.gif')";
                } else if (response.weather[0].icon == "50d" || response.weather[0].icon == "50n") {
                    console.log("dusty")
                    weatherImage.src = "assets/weather-dust.png";
                    tempDisplay.style.backgroundImage = "url('assets/mist weather.gif')";
                }

                humidity.innerHTML = `${response.main.humidity}%`
                clouds.innerHTML = `${response.clouds.all}%`
                wind.innerHTML = `${response.wind.speed}km/h`

            })
            .catch(err => {
                console.log(err)
                swal({
                    icon: 'error',
                    title: 'Unable to Fetch Required City Data',
                    text: 'Please enter valid city name or Try again later',
                    button: "OK"
                })
            })
    }
}