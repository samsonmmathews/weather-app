window.onload = function() {
    const form = document.getElementById("weatherForm");
    const input = document.getElementById("cityInput");
    const result = document.getElementById("result");

    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        const city = input.value.trim();
        if(!city)
        {
            return;
        }

        result.innerHTML = "Fetching weather...";

        try {
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            const data = await response.json();

            if (data.error) {
                result.innerHTML = `<p style="color:red;">${data.error}</p>`;
            } else {
                result.innerHTML = `
                    <h2>Weather in ${data.city}:</h2>
                    <p>Temperature: ${data.temp}°C</p>
                    <p>Condition: ${data.desc}</p>
                `;
            }
        } catch {
            result.innerHTML = `<p style="color:red;">Error fetching weather data.</p>`;
        }
    });
}