navigator.geolocation.getCurrentPosition(getPosition, getError);

function getError(PositionError) {
    if (PositionError.code === 1) {
        locationPrompt();
        return
    }
    alert("Ocorreu um erro, tente novamente mais tarde.");
}

function locationPrompt () {
    const lat = prompt("Digite sua latitude");
    const lon = prompt("Digite sua longitude");
    getWeatherData(lat, lon);
}

function getPosition (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherData(lat, lon);
}

function getWeatherData (lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b0cc507d047c1af8e559e3bb45d1d9bb&units=metric&lang=pt_br`;
    const promisse = axios.get(url);
    promisse.then((serverAnswer) => displayData(serverAnswer.data))
    promisse.catch(() => alert("Ocorreu um erro, tente novamente mais tarde."));
}


function displayData (data) {
    console.log(data);
    const city = document.querySelector(".city");
    const temperature = document.querySelector(".temperature");
    const weather = document.querySelector(".weather");
    const image = document.querySelector(".image");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");
    const rain = document.querySelector(".rain");
    city.innerHTML = `<p>${data.name}</p>`;
    temperature.innerHTML = `<p>${data.main.temp.toFixed(1)}°C</p>
                            <p>${data.main.temp_min.toFixed(1)}°C | ${data.main.temp_max.toFixed(1)}°C</p>`;
    weather.innerHTML = `<p>${data.weather[0].description}</p>`;
    image.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    humidity.innerHTML = `<p>Humidade: ${data.main.humidity}%</p>`;
    wind.innerHTML = `<p>Velocidade do vento: ${data.wind.speed}m/s</p>`;
    if (data.rain !== undefined) {
        rain.innerHTML = `<p>${data.rain["1h"]}mm de chuva na última hora</p>`;
    }
}