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
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ city })
            });

            const html = await response.text();
            document.body.innerHTML = html;
        } catch (err) {
            result.innerHTML = "Error fetching weather data.";
        }
    });
}