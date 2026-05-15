import { fetchWeatherApi } from "openmeteo";

export const getCurrentWeatherData = async (longitude: number, latitude: number) => {

    const params = {
        latitude: latitude,
        longitude: longitude,
        current: ["temperature_2m", "apparent_temperature", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
        forecast_days: 16,
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current()!;

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0)!.value(),
                apparent_temperature: current.variables(1)!.value(),
                relative_humidity_2m: current.variables(2)!.value(),
                precipitation: current.variables(3)!.value(),
                wind_speed_10m: current.variables(4)!.value(),
            },
        };

        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};