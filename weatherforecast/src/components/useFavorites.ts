import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

export type FavoriteLocation = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country?: string;
  state?: string;
};

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch favorites from Supabase
  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching favorites:", error);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  // Run fetch on mount and when user changes
  useEffect(() => {
    fetchFavorites();
  }, [user]);

  // Add a new favorite
  const addFavorite = async (location: Omit<FavoriteLocation, "id">) => {
    if (!user) return null;

    // Check if it already exists to prevent duplicates
    const exists = favorites.find(
      (f) => f.lat === location.lat && f.lon === location.lon
    );
    if (exists) return exists;

    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: user.id,
          name: location.name,
          lat: location.lat,
          lon: location.lon,
          country: location.country,
          state: location.state,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding favorite:", error);
    } else if (data) {
      setFavorites([data, ...favorites]);
    }
    setLoading(false);
    return data;
  };

  // Remove a favorite
  const removeFavorite = async (id: string) => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase.from("favorites").delete().eq("id", id);

    if (error) {
      console.error("Error removing favorite:", error);
    } else {
      setFavorites(favorites.filter((f) => f.id !== id));
    }
    setLoading(false);
  };

  // Helper check
  const isFavorite = (lat: number, lon: number) => {
    return favorites.some((f) => f.lat === lat && f.lon === lon);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, loading };
};
