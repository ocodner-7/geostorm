// import { geocodeCity } from "@/data/api/geocodeLocation";
// import { getWeather } from "@/data/api/getWeather";
// import { normalizeWeather } from "@/data/utils";
// import { GeoResult } from "@/types";

// // export const fetchWeatherByCity = async (city: string) => {
// //     const geo = await geocodeCity(city);
// //     const raw = await getWeather(geo.latitude, geo.longitude);
// //     return normalizeWeather(raw, geo);
// // };


// export const fetchWeather = async (geo: GeoResult) => {
//     const raw = await getWeather(geo.latitude, geo.longitude);
//     console.log(geo);
//     return normalizeWeather(raw, geo);
// };