import { useState } from "react";
import { useFavorites } from "@/components/useFavorites";
import { useWeather } from "@/hooks/useWeather";
import { APP } from "@/config";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StarIcon, Trash2Icon, MapPinIcon } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export const FavoritesDrawer = () => {
  const { user } = useAuth();
  const { favorites, removeFavorite, loading } = useFavorites();
  const { setWeather } = useWeather();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null; // Only show if logged in

  const handleSelectFavorite = (lat: number, lon: number) => {
    setWeather({ lat, lon });
    localStorage.setItem(APP.STORE_KEY.LAT, lat.toString());
    localStorage.setItem(APP.STORE_KEY.LON, lon.toString());
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" title="View Favorites">
          <StarIcon className="w-5 h-5 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-l-border">
        <SheetHeader>
          <SheetTitle>Your Favorites</SheetTitle>
          <SheetDescription>
            Quickly jump to your saved locations.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-6 overflow-y-auto max-h-[80vh] pr-2">
          {loading && <p className="text-sm text-center">Loading...</p>}
          {!loading && favorites.length === 0 && (
            <div className="text-center text-muted-foreground mt-10">
              <StarIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>No favorites saved yet.</p>
              <p className="text-sm mt-1">
                Click the star on a weather card to add one!
              </p>
            </div>
          )}

          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="group flex flex-row items-center justify-between p-3 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <button
                className="flex-1 text-left flex items-start gap-3"
                onClick={() => handleSelectFavorite(fav.lat, fav.lon)}
              >
                <div className="mt-0.5">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{fav.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {fav.state ? `${fav.state}, ` : ""}
                    {fav.country}
                  </p>
                </div>
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(fav.id);
                }}
                disabled={loading}
                title="Remove favorite"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
