import { useQuery } from "@tanstack/react-query";

export const useDeviceLocation = () => {
  return useQuery({
    queryKey: ["device-location"],
    queryFn: () =>
      new Promise<{ lat: number; lon: number }>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation unavailable"));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 7000 },
        );
      }),
    staleTime: Infinity,
    retry: false,
  });
};
