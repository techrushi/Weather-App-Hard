const input = document.querySelector("input");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

// Clear any previous data before each request
function clearData() {
    icon.innerHTML = '';
    weather.innerHTML = '';
    temperature.innerHTML = '';
    description.innerHTML = '';
}

btn.addEventListener("click", () => {
    let city = input.value.trim(); // Trim input to remove extra spaces
    if (city) {
        clearData(); // Clear previous weather data
        getWeather(city);
    } else {
        alert('Please enter a valid city name');
    }
});

function getWeather(city) {
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'fe6f832405202db13a9ecef42a4dee7e'}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found'); // Error handling for non-200 responses
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;

            const weatherCity = data.name;
            const weatherCountry = data.sys.country;
            weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

            let weatherTemp = data.main.temp;
            weatherTemp = weatherTemp - 273; // Convert from Kelvin to Celsius
            const temp = weatherTemp.toFixed(2);
            temperature.innerHTML = `${temp}°C`;

            const weatherDesc = data.weather[0].description;
            description.innerHTML = weatherDesc;

        })
        .catch(error => {
            console.error(error); // Log error for debugging
            alert('Failed to retrieve weather data. Please check the city name and try again.');
            clearData(); // Clear previous weather data on error
        });
}

