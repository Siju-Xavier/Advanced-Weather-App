import { openWeatherApi } from "@/api";
import { WEATHER_API, APP  } from "@/config";
import { useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { MapPinnedIcon, SearchIcon } from "lucide-react";
import type { Geocoding } from "@/types";

export const SearchDialog = () => {
  //Hooks
  const { setWeather} = useWeather();
  const [searchQuery, setSearchQuery] = useState("");       // User's input
  const [results, setResults] = useState<Geocoding[]>([]);  // API results
  const [isOpen, setIsOpen] = useState(false);              // Dialog open state

  // Fetch geocoding results whenever searchQuery changes
  useEffect(() => {
    if (!searchQuery) return; // Don't fetch empty query

    const fetchGeocoding = async () => {
      try {
        const response = await openWeatherApi.get("/geo/1.0/direct", {
          params: {
            q: searchQuery,
            limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
          },
        });
        setResults(response.data as Geocoding[]);
      } catch (error) {
        console.error("Geocoding failed:", error);
        setResults([]); // Clear results on error
      }
    };

    fetchGeocoding();
  }, [searchQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SearchIcon className="lg:text-muted-foreground" />
          <div className="flex justify-between w-[250px] max-lg:hidden">
            Search weather...
            <KbdGroup>
              <Kbd>⌘</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 bg-card gap-0" showCloseButton={false}>
        {/* Hidden header for screen readers */}
        <DialogHeader className="sr-only">
          <DialogTitle>Search weather</DialogTitle>
          <DialogDescription>
            Search Weather by typing the name of the country or city.
          </DialogDescription>
        </DialogHeader>

        {/* Search input */}
        <InputGroup className="ring-0! border-t-0 border-x-0! border-b border-border! rounded-b-none bg-transparent">
          <InputGroupInput
            placeholder="Search Weather..."
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        {/* Results list */}
        <ItemGroup className="min-h-80 p-2">
          {!results.length && (
            <p className="text-center text-sm py-4">No results</p>
          )}
          {results.map(({ name, lat, lon, state, country }) => (
            <Item
              key={`${name}-${lat}-${lon}`} // more robust key
              size="sm"
              className="relative p-2"
            >
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>
                  {state ? `${state}, ` : ""}
                  {country}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="after:absolute after:inset-0"
                    onClick={() => {
                      setWeather({lat, lon});
                      localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
                      localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
              
                    }}
                  >
                    <MapPinnedIcon />
                  </Button>
                </DialogClose>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};