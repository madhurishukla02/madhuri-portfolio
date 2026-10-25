const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");

projectSearch.addEventListener("input", function () {
  const query = projectSearch.value.trim().toLowerCase();

  projectCards.forEach(function (card) {
    const title = card.querySelector(".project-title").textContent.toLowerCase();
    const description = card.querySelector(".project-description").textContent.toLowerCase();
    const technologies = card.querySelector(".project-tech").textContent.toLowerCase();

    const matches =
      query === "" ||
      title.includes(query) ||
      description.includes(query) ||
      technologies.includes(query);

    card.hidden = !matches;
  });
});
// Dark / Light Mode

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

weatherButton.addEventListener("click", async function () {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    weatherResult.innerHTML = "<p>Loading weather...</p>";

    try {
        const locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json"
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            weatherResult.innerHTML = "<p>City not found.</p>";
            return;
        }

        const location = locationData.results[0];

        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            location.latitude +
            "&longitude=" +
            location.longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        const weatherData = await weatherResponse.json();

        weatherResult.innerHTML = `
            <h3>${location.name}, ${location.country}</h3>
            <p>Temperature: ${weatherData.current.temperature_2m}°C</p>
            <p>Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {
        weatherResult.innerHTML =
            "<p>Unable to fetch weather data. Please try again.</p>";
    }
});
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

chatSend.addEventListener("click", function () {

    const userMessage = chatInput.value.trim();

    if (userMessage === "") {
        return;
    }

    const userText = document.createElement("p");
    userText.innerHTML = "<strong>You:</strong> " + userMessage;
    chatMessages.appendChild(userText);

    const message = userMessage.toLowerCase();

    let botReply = "";

    if (message.includes("who are you") || message.includes("about madhuri")) {
        botReply = "Madhuri Shukla is a 2nd Year B.Tech student at JECRC University.";
    }
    else if (message.includes("skill") || message.includes("language")) {
        botReply = "Madhuri's skills include C, C++, Python, Java, and JavaScript.";
    }
    else if (message.includes("project")) {
        botReply = "Madhuri has five projects: Python Programs Collection, Messy Python Code Improvement, Bug Fixing Using Cursor AI, Interactive Quiz Application, and Book Reading List Application.";
    }
    else if (message.includes("github")) {
        botReply = "You can find Madhuri's projects on GitHub at github.com/madhurishukla02.";
    }
    else if (message.includes("hello") || message.includes("hi")) {
        botReply = "Hello! How can I help you learn about Madhuri?";
    }
    else {
        botReply = "Sorry, I don't know the answer to that yet. Try asking about Madhuri's skills, projects, or GitHub.";
    }

    const botText = document.createElement("p");
    botText.innerHTML = "<strong>Bot:</strong> " + botReply;
    chatMessages.appendChild(botText);

    chatInput.value = "";
});