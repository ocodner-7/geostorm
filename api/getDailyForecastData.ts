import { fetchWeatherApi } from "openmeteo";

export const getDailyForecastData = async (longitude: number, latitude: number) => {

    const params = {
        latitude: latitude,
        longitude: longitude,
        daily: ["temperature_2m_max", "temperature_2m_min", "rain_sum", "showers_sum", "snowfall_sum"],
        timezone: "auto",
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const responses = await fetchWeatherApi(url, params);

        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];

        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const daily = response.daily()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            daily: {
                time: Array.from(
                    { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m_max: daily.variables(0)!.valuesArray(),
                temperature_2m_min: daily.variables(1)!.valuesArray(),
                rain_sum: daily.variables(2)!.valuesArray(),
                showers_sum: daily.variables(3)!.valuesArray(),
                snowfall_sum: daily.variables(4)!.valuesArray(),
            },
        };
        console.log("Daily Forecast Data:", weatherData);
        return weatherData;
    } catch (error) {
        console.error("Error fetching daily forecast data:", error);
        throw error;
    }
};