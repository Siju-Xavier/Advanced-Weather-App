import { getUserLocation } from "@/lib/utils"
import { App } from "@/App"
import { useWeather } from "@/hooks/useWeather"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LocateFixedIcon } from "lucide-react"
import { use } from "react"
import { APP } from "@/config"


export const PageHeader = () => {

    const {weather, setWeather} = useWeather();

    if (!weather) return <Skeleton/>
    return <div className="flex items-center gap-4 mb-4">
        <h2>{weather.location.name},{''} {weather.location.state ? weather.location.state + ',' : ''}
            {weather.location.country}        </h2>
        <Button variant='outline'
        size='icon-sm'
        onClick={async() => {
            getUserLocation().then(({lat, lon})=> {
                setWeather({lat,lon});

                localStorage.setItem(APP.STORE_KEY.LAT,lat.toString());
                localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
            }).catch((err) => {
                alert(err)
            })
        }}>
            <LocateFixedIcon />
        </Button>
    </div>
}