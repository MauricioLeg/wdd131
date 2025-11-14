
const year = document.querySelector("#currentyear")
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = document.lastModified;

async function getWeather() {
    const apiKey = "e4074a526cfb3b6535f34c46f51e2313"
    const units = "metric"
    const city = "Seoul"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const temperature = data.main.temp;
        const wind = data.wind.speed * 3.6;
        
        if (data.cod != 200) {
            document.getElementById("weather").innerHTML = `<p> City not found!</p>`;
            return;
        }
        
        function calculateWindChill(tempC, windKmH) {
            return (13.12 + 0.6215 * tempC - 11.37 * (windKmH ** 0.16) + 0.3965 * tempC * (windKmH ** 0.16)).toFixed(2) + "°C";
        }
        let chillDisplay = "N/A";
        if (wind > 4.8 && temperature <= 10) {
            chillDisplay = calculateWindChill(temperature, wind);
        }
        document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById("wind").textContent = `Wind: ${wind.toFixed(2)}km/h`;
        document.getElementById("chill").textContent = `Windchill: ${chillDisplay}`;
    }
    catch (error) {
        console.error("Error:", error);
    }
}

getWeather();
