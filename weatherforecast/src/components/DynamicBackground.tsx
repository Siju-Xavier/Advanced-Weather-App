import { useWeather } from "@/hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

export const DynamicBackground = () => {
  const { weather } = useWeather();
  
  if (!weather) return null;

  const conditionCode = weather.current.weather[0].id;
  const isNight = weather.current.weather[0].icon.includes("n");

  let gradient = "";
  
  // Mapping OpenWeatherMap condition codes to beautiful gradients
  if (isNight) {
    gradient = "from-slate-900 via-purple-900 to-slate-900";
  } else if (conditionCode >= 200 && conditionCode < 300) {
    // Thunderstorm
    gradient = "from-slate-700 via-slate-800 to-indigo-900";
  } else if (conditionCode >= 300 && conditionCode < 600) {
    // Rain or Drizzle
    gradient = "from-blue-800 via-blue-600 to-blue-900";
  } else if (conditionCode >= 600 && conditionCode < 700) {
    // Snow
    gradient = "from-blue-100 via-indigo-100 to-slate-200 dark:from-slate-800 dark:to-slate-900";
  } else if (conditionCode === 800) {
    // Clear
    gradient = "from-sky-400 via-blue-500 to-sky-300 dark:from-blue-900 dark:to-slate-900";
  } else {
    // Clouds
    gradient = "from-slate-400 via-slate-300 to-slate-200 dark:from-slate-800 dark:to-gray-900";
  }

  return (
    <AnimatePresence>
      <motion.div
        key={gradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-20 dark:opacity-40`}
      />
    </AnimatePresence>
  );
};
