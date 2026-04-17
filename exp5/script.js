$(document).ready(function() {
    $("#getWeatherBtn").click(function() {
        const city = $("#cityInput").val().trim();
        if (city === "") {
            showError("Please enter a city name.");
            return;
        }

        fetchWeather(city);
    });

    // Enter key support
    $("#cityInput").keypress(function(e) {
        if (e.which == 13) {
            $("#getWeatherBtn").click();
        }
    });

    function fetchWeather(city) {
        // Reset UI
        $("#weatherResult").addClass("d-none");
        $("#errorMessage").addClass("d-none");
        $("#loader").removeClass("d-none");

        // Step 1: Get location key using city search
        $.ajax({
            url: `/api/search?q=${encodeURIComponent(city)}`,
            method: "GET",
            success: function(locationData) {
                if (locationData && locationData.length > 0) {
                    const location = locationData[0];
                    const locationKey = location.Key;
                    const cityName = `${location.LocalizedName}, ${location.Country.LocalizedName}`;

                    // Step 2: Fetch weather data using location key
                    $.ajax({
                        url: `/api/weather/${locationKey}`,
                        method: "GET",
                        success: function(weatherData) {
                            displayWeather(cityName, weatherData[0]);
                        },
                        error: function() {
                            showError("Failed to fetch weather data.");
                        },
                        complete: function() {
                            $("#loader").addClass("d-none");
                        }
                    });
                } else {
                    showError("City not found. Please check the spelling.");
                    $("#loader").addClass("d-none");
                }
            },
            error: function(xhr) {
                showError("Failed to fetch city data. Server connection issue.");
                $("#loader").addClass("d-none");
            }
        });
    }

    function displayWeather(cityName, data) {
        $("#displayCity").text(cityName);
        $("#displayTemp").text(`${data.Temperature.Metric.Value}°C`);
        $("#displayCondition").text(data.WeatherText);
        $("#displayHumidity").text(`${data.RelativeHumidity}%`);
        $("#displayWind").text(`${data.Wind.Speed.Metric.Value} ${data.Wind.Speed.Metric.Unit}`);

        $("#weatherResult").removeClass("d-none");
    }

    function showError(msg) {
        $("#errorMessage").text(msg).removeClass("d-none");
        $("#loader").addClass("d-none");
        $("#weatherResult").addClass("d-none");
    }
});
