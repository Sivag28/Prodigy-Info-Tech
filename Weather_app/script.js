const weatherApiKey = '6a2fad3ff3f44e23ab4182113251802'; 

const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const forecastContainer = document.getElementById('forecastContainer');
const favoriteCitiesContainer = document.getElementById('favoriteCities');
const backgroundContainer = document.getElementById('background-image-container');

let favoriteCities = JSON.parse(localStorage.getItem('favorites')) || [];

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
      weatherResult.innerHTML = "<p style='color: red;'>Please enter a city name.</p>";
      return;
  }

  const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=yes`; // ✅ Added `aqi=yes`
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=14`;

  try {
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      if (weatherData.error) throw new Error(weatherData.error.message);

      displayWeather(weatherData);
      getForecast(city);
      displayAQI(weatherData.current.air_quality); 
      changeBackground(weatherData.current.condition.text);
      document.body.classList.add("weather-active");
  } catch (error) {
      weatherResult.innerHTML = `<p style='color: red;'>${error.message}</p>`;
  }
}
function displayAQI(airQuality) {
  if (!airQuality) {
      weatherResult.innerHTML += `<p>Air Quality Data Unavailable</p>`;
      return;
  }

  const aqi = airQuality.pm2_5; 
  const aqiText =
      aqi < 50 ? "Good 😊" :
      aqi < 100 ? "Moderate 😐" :
      aqi < 150 ? "Unhealthy for Sensitive Groups 🤧" :
      aqi < 200 ? "Unhealthy 😷" :
      aqi < 300 ? "Very Unhealthy 😨" : "Hazardous ☠️";

  weatherResult.innerHTML += `<p>🌿 Air Quality Index: ${aqi} (${aqiText})</p>`;
}


function displayWeather(data) {
    const sunrise = new Date(data.location.localtime).toLocaleTimeString();
    const sunset = new Date(data.location.localtime).toLocaleTimeString();

    weatherResult.innerHTML = `
    <div class="weather-card">
        <h2>${data.location.name}, ${data.location.country} ☀</h2>
        <p>Temperature: ${data.current.temp_c}&#8451; 🌡</p>
        <p>Weather: ${data.current.condition.text} 🌤</p>
        <p>Humidity: ${data.current.humidity}% 💧</p>
        <p>Wind Speed: ${data.current.wind_kph} km/h 🌬</p>
        <p>Sunrise: ${sunrise} 🌅</p>
        <p>Sunset: ${sunset} 🌇</p>
        <button onclick="addToFavorites('${data.location.name}')">⭐ Add to Favorites</button>
        </div>
    `;
}

function getWeatherEmoji(condition) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("sunny")) return "☀️"; 
  if (conditionLower.includes("clear")) return "🌞"; 
  if (conditionLower.includes("cloud")) return "☁️"; 
  if (conditionLower.includes("rain")) return "🌧️"; 
  if (conditionLower.includes("thunder")) return "⛈️"; 
  if (conditionLower.includes("snow")) return "❄️"; 
  if (conditionLower.includes("mist") || conditionLower.includes("fog")) return "🌫️"; 

  return "🌍"; 
}

async function getForecast(city) {
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=14`;

  try {
      const response = await fetch(forecastUrl);
      const forecastData = await response.json();

      forecastContainer.innerHTML = '<h3>Upcoming 14-Day Forecast</h3>';
      forecastData.forecast.forecastday.forEach(day => {
          const emoji = getWeatherEmoji(day.day.condition.text); 
          forecastContainer.innerHTML += `
              <div class="forecast-card">
                  <p>${day.date}: ${day.day.avgtemp_c}°C - ${day.day.condition.text} ${emoji}</p>
              </div>
          `;
      });
  } catch (error) {
      forecastContainer.innerHTML = `<p style='color: red;'>Failed to fetch forecast data.</p>`;
  }
}

async function getAQI(lat, lon) {
    const aqiUrl = `https://api.weatherapi.com/v1/air_quality.json?key=${weatherApiKey}&q=${lat},${lon}`;

    try {
        const response = await fetch(aqiUrl);
        const aqiData = await response.json();

        if (!aqiData.current || !aqiData.current.air_quality) {
            weatherResult.innerHTML += `<p>Air Quality Data Unavailable</p>`;
            return;
        }

        const aqi = aqiData.current.air_quality.pm2_5;
        const aqiText = aqi < 50 ? "Good" : aqi < 100 ? "Moderate" : aqi < 150 ? "Unhealthy for Sensitive Groups" : "Unhealthy";

        weatherResult.innerHTML += `<p>Air Quality Index: ${aqi} (${aqiText}) 🌿</p>`;
    } catch (error) {
        weatherResult.innerHTML += `<p style='color: red;'>Failed to fetch AQI data.</p>`;
    }
}

function addToFavorites(city) {
    if (!favoriteCities.includes(city)) {
        favoriteCities.push(city);
        localStorage.setItem('favorites', JSON.stringify(favoriteCities));
        displayFavoriteCities();
    }
}

function displayFavoriteCities() {
    favoriteCitiesContainer.innerHTML = '<h3>Favorite Cities</h3>';
    favoriteCities.forEach(city => {
        favoriteCitiesContainer.innerHTML += `<p>${city}</p>`;
    });
}

displayFavoriteCities();

function changeBackground(weatherCondition) {
  const condition = weatherCondition.trim().toLowerCase(); 

  backgroundContainer.style.transition = "background 0.1s ease-in-out"; 

  if (condition.includes('clear')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #87CEEB, #00BFFF)"; 
  } else if (condition.includes('cloud')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #B0C4DE, #778899)"; 
  } else if (condition.includes('rain')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #4682B4, #1E3C72)"; 
  } else if (condition.includes('snow')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #F0F8FF, #E0FFFF)"; 
  } else if (condition.includes('thunder')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #2F4F4F, #000000)"; 
  } else if (condition.includes('mist') || condition.includes('fog')) {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #A9A9A9, #696969)"; 
  } else {
      backgroundContainer.style.backgroundImage = "linear-gradient(to right, #FFD700, #FFA500)"; 
  }
}



function resetWeatherApp() {
    cityInput.value = '';
    weatherResult.innerHTML = '';
    forecastContainer.innerHTML = '';
    favoriteCitiesContainer.innerHTML = '';
    backgroundContainer.style.background = "url('default-image.jpg') no-repeat center center/cover"; 
    document.body.classList.remove("weather-active");
    displayFavoriteCities(); 
}
