export type LocationState = {
    longitude: number | null;
    latitude: number | null;
    error: string | null;
};  

export type WeatherData = {
    location: {
        city: string;
        country: string,
        localTime: string;
    };

    current: {
        temperature: string;
        feelsLike: number;
        humidity: number;
        windSpeed: number;
        precipitation: number;
    };

    // hourly: {

    // }
};