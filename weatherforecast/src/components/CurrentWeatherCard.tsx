
import {APP, WEATHER_API} from "@/config";

import { useWeather } from "@/hooks/useWeather";
import { useFavorites } from "@/components/useFavorites";
import { useAuth } from "@/components/AuthProvider";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { Navigation2Icon, StarIcon } from "lucide-react";
import type { WeatherUnitType } from "@/components/WeatherProvider";

export const CurrentWeatherCard = () => {
    const { weather } = useWeather();
    const { user } = useAuth();
    const { addFavorite, removeFavorite, isFavorite, loading, favorites } = useFavorites();

    if (!weather) return <Skeleton className="min-h-[300px] rounded-xl"/>
    
    const currentWeather = {
        dt: new Date(weather.current.dt * 1000).toLocaleTimeString('en-US',{
            timeStyle:'short'
        }),
        iconCode: weather.current.weather[0].icon,
        temp: weather.current.temp.toFixed(),
        description: weather.current.weather[0].description,
        feelsLike: weather.current.feels_like.toFixed(),
        windSpeed: weather.current.wind_speed.toFixed(),
        windDeg: weather.current.wind_deg,
        humidity: weather.current.humidity,
        visibility:(weather.current.visibility / 1000).toFixed(),
        pressure: weather.current.pressure,
        dewPoint: weather.current.dew_point.toFixed(),
    };

    const weatherUnit = (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) || WEATHER_API.DEFAULTS.UNIT;

    // Check if current location is favorite
    const currentIsFavorite = isFavorite(
        weather.location.lat,
        weather.location.lon
    );
    const favoriteRecord = favorites.find(
        (f) => f.lat === weather.location.lat && f.lon === weather.location.lon
    );

    const toggleFavorite = async () => {
        if (!user) return alert("Please sign in to save favorites.");
        if (currentIsFavorite && favoriteRecord) {
            await removeFavorite(favoriteRecord.id);
        } else {
            await addFavorite({
                name: weather.location.name,
                lat: weather.location.lat,
                lon: weather.location.lon,
                country: weather.location.country,
                state: weather.location.state,
            });
        }
    };
    
    return (
        <Card className="@container min-h-[300px] relative bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                    <CardTitle>Current Weather</CardTitle>
                    <CardDescription>{currentWeather.dt}</CardDescription>
                </div>
                {user && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleFavorite} 
                        disabled={loading}
                        title={currentIsFavorite ? "Remove from favorites" : "Save to favorites"}
                    >
                        <StarIcon className={`w-6 h-6 ${currentIsFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    </Button>
                )}
            </CardHeader>
            <CardContent className="grow">
                <div className="flex flex-wrap items-center gap-x-6">
                <figure>
                    <img src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@4x.png`} alt={currentWeather.description} width={70} height={70}  className='object-contain'/>
                </figure>
                <p className="text-4xl font-medium flex-items-start sm:text-6xl">{currentWeather.temp}
                    <span className="text-3xl align-super">{APP.UNIT.TEMP[weatherUnit]}</span>
                </p>
                <div>
                    <p className="font-medium capitalize sm:text-lg">
                        {currentWeather.description}
                    </p>
                    <div className="text-sm flex items-center gap-2">
                        <span className="text-muted-foreground">Feels like</span>
                        <span>{currentWeather.feelsLike}</span>
                    </div>
                </div>
                </div>           
            </CardContent>
            <CardFooter className="flex-wrap gap-x-8 gap-y-2 @lg:justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">Wind
                    </p>
                    <div className="flex items-center gap-1">
                        <p>
                            {currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}
                        </p>
                        <Navigation2Icon size={14}
                        fill='currentColor'
                        style={{rotate:`${currentWeather.windDeg}deg`,}}/>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>

                    <div className="flex items-center gap-1">
                        <p> {currentWeather.humidity}%</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">visibility</p>

                    <div className="flex items-center gap-1">
                        <p>
                            {currentWeather.visibility} km
                        </p>

                    </div>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Pressure</p>
                    <div className="flex items-center gap-1">
                        <p>{currentWeather.pressure} hPa</p>
                    </div>
                </div>                                
                <div>
                    <p className="text-sm text-muted-foreground">Dew Point</p>
                    <div className="flex items-center gap-1">
                        <p>{currentWeather.dewPoint}°</p>
                     </div>
                </div>                
            </CardFooter>
        </Card>
    )

}