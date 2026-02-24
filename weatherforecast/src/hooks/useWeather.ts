import { WeatherProviderContext } from "@/components/WeatherProvider";

import { useContext } from "react";

export const useWeather = () => {
    const context = useContext(WeatherProviderContext);
    if (context == undefined){
        throw new Error('useWeather used wihtin a weatherprovider')
    }

    return context;
}