import { openWeatherApi } from "@/api";
import { APP, WEATHER_API } from "@/config";
import {useEffect, useCallback, useState} from "react";
import { Dialog, DialogTrigger,DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemActions,ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";


import { Map, MapPinnedIcon, SearchIcon } from "lucide-react";
import type { Geocoding } from "@/types";

export const SearchDialog = () => {

    const [search, setSearch] = useState<string>('');
    const[results, setResults] = useState<Geocoding[]>([]);
    const [SearchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);

    //Search request
const geocoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get('/geo/1.0/direct', {
        params: {
            q: search,
            limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
        }
    });
    return response.data as Geocoding[];
}, []);


//Search functionality
useEffect(() => {
    if(!search) return;
    (async () => {
        const results = await geocoding(search);

        if (results) setResults(results);
    })();
},[search, geocoding]);

return <Dialog open={SearchDialogOpen} onOpenChange={setSearchDialogOpen}><DialogTrigger asChild>
    <Button variant='ghost' className="me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50"
    onClick={() => setSearchDialogOpen((prev) => !prev)}>
        <SearchIcon className="lg:text-muted-foreground" />
        <div className="flex justify-between w-[250px] max-lg:hidden">Search weather...
            <KbdGroup>
                <Kbd>⌘</Kbd>
            </KbdGroup>
        </div>
        </Button></DialogTrigger>
        <DialogContent className="p-0 bg-card gap-0" showCloseButton={false}>
            <DialogHeader className="sr-only">
                <DialogTitle>Search weather</DialogTitle>
                <DialogDescription>
                    Search Weather by typing the name of the country or city.
                </DialogDescription>
            </DialogHeader>
            <InputGroup className="ring-0! border-t-0 border-x-0! border-b border-border! rounded-b-none bg-transparent">
            <InputGroupInput placeholder="Search Weather..." value={search} onInput={(e) => setSearch(e.currentTarget.value)}></InputGroupInput>
            <InputGroupAddon>
            <SearchIcon/>
            </InputGroupAddon>
            </InputGroup>
            <ItemGroup className="min-h-80 p-2">
                {!results.length && (
                    <p className="text-center text-sm py-4">No results</p>
                )}
                {results.map(({ name, lat, lon, state, country}) => (
                    <Item key={name + lat + lon}
                    size='sm'
                    className="relative p-2">
                        <ItemContent>
                            <ItemTitle>{name}</ItemTitle>
                            <ItemDescription>
                                {state ? state + ',' : ''}
                                {country}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <DialogClose asChild>
                                <Button variant='ghost' size='icon' className="after:absolute after:inset-0"
                                onClick={() => {}}>
                                    <MapPinnedIcon />
                                </Button>
                            </DialogClose>
                        </ItemActions>
                    </Item>

                ))}

            </ItemGroup>
        </DialogContent>
        </Dialog>
};
