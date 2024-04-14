// Function to fetch weather and cryptocurrency data
async function fetchWeatherAndCrypto() {
  try {
    // Get user's geolocation
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    // Fetch weather data based on user's geolocation
    const weatherRes = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);

    // Check if weather data is available
    if (!weatherRes.ok) {
      throw Error("Weather data not available");
    }

    // Parse weather data
    const weatherData = await weatherRes.json();
    // Construct weather icon URL
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    // Update weather section in HTML
    document.getElementById("weather").innerHTML = `
      <img src=${weatherIconUrl} />
      <p class="weather-temp">${Math.round(weatherData.main.temp)}º</p>
      <p class="weather-city">${weatherData.name}</p>
    `;
  } catch (error) {
    // Handle errors fetching weather data
    console.error("Error fetching weather data:", error);
    // Handle error
  }

  try {
    // Fetch cryptocurrency data
    const cryptoRes = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");

    // Check if cryptocurrency data is available
    if (!cryptoRes.ok) {
      throw Error("Something went wrong");
    }

    // Parse cryptocurrency data
    const cryptoData = await cryptoRes.json();

    // Update cryptocurrency section in HTML
    document.getElementById("crypto-top").innerHTML = `
      <img src=${cryptoData.image.small} />
      <span>${cryptoData.name}</span>
    `;

    document.getElementById("crypto").innerHTML += `
      <p>🎯: $${cryptoData.market_data.current_price.usd}</p>
      <p>👆: $${cryptoData.market_data.high_24h.usd}</p>
      <p>👇: $${cryptoData.market_data.low_24h.usd}</p>
    `;
  } catch (error) {
    // Handle errors fetching cryptocurrency data
    console.error("Error fetching cryptocurrency data:", error);
    // Handle error
  }
}

// Function to fetch background image from Unsplash API
async function fetchBackgroundImage() {
  try {
    // Fetch random landscape image from Unsplash API
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    const data = await res.json();
    // Update background image of the document
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    // Update author name
    document.getElementById("author").textContent = "Created By: Mulalo"; // Change author name to Mulalo
  } catch (error) {
    // Handle errors fetching background image
    console.error("Error fetching image data:", error);
    // Handle error
  }
}

// Function to change background image automatically every 10 seconds
function changeBackgroundAutomatically() {
  fetchBackgroundImage(); // Change background immediately
  setInterval(fetchBackgroundImage, 10000); // Change background every 10 seconds
}

// Start changing background automatically
changeBackgroundAutomatically();
// Fetch weather and cryptocurrency data
fetchWeatherAndCrypto();
// Update current time every 3 seconds
setInterval(getCurrentTime, 3000);

// Function to update current time in HTML
function getCurrentTime() {
  const date = new Date();
  // Update time display in HTML
  document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" });
}
