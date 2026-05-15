export const geocodeLocation = async (query: string) => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No results found");
    };

    const { latitude, longitude, name, country } = data.results[0];
    return { latitude, longitude, name, country };
};