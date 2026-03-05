# Advanced Weather App


A modern, responsive weather forecast application built with React, TypeScript, and Vite. It provides detailed current and hourly weather information, an interactive map, and customizable user preferences.This App is not built from scratch by me , I have referred this from a youtube tutorial(@codewithsadee) and made it simpler in my own way to hone my React skills.

## Features

-   **Current Weather:** Displays real-time weather conditions, including temperature, "feels like" temperature, wind speed and direction, humidity, visibility, pressure, and dew point.
-   **Hourly Forecasts:** Interactive tabs provide detailed hourly data for:
    -   Overview (Temperature & Feels Like)
    -   Precipitation
    -   Wind
    -   Humidity
    -   Cloud Cover
    -   Pressure
    -   UV Index
    -   Visibility
-   **Location Search:** A searchable dialog to find weather forecasts for any city or country worldwide.
-   **Geolocation:** A "Get my location" button to instantly fetch weather data for the user's current position using the browser's Geolocation API.
-   **Interactive Map:** An integrated Mapbox map that centers on the selected location and displays a marker with the current temperature.
-   **Theme Toggling:** Switch between Light, Dark, and System-based themes.
-   **Unit Selection:** Choose between Metric (°C, m/s) and Imperial (°F, mph) units for weather data.

## Tech Stack

-   **Framework:** React, TypeScript, Vite
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Data Fetching:** Axios
-   **State Management:** React Context API
-   **Charting:** Recharts
-   **Mapping:** Mapbox GL JS
-   **Icons:** Lucide React

## Getting Started

To run this project locally, follow the steps below.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Siju-Xavier/Advanced-Weather-App.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd Advanced-Weather-App/weatherforecast
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

You need to create a `.env` file in the `weatherforecast` directory to store your API keys.

1.  Create a file named `.env`:
    ```bash
    touch .env
    ```

2.  Add the following environment variables to the `.env` file. You will need to obtain your own free API keys from [OpenWeather](https://openweathermap.org/api) and [Mapbox](https://www.mapbox.com/).

    ```env
    VITE_OPEN_WEATHER_API=YOUR_OPENWEATHER_API_KEY
    VITE_MAPBOX_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
    ```

### Running the Application

-   To start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

-   To build the project for production:
    ```bash
    npm run build
    ```

-   To run the linter:
    ```bash
    npm run lint
    ```

## Project Structure

The source code is organized within the `src` directory as follows:

```
src/
├── api/          # Axios instance configuration for API calls.
├── assets/       # SVG components, like the application logo.
├── components/   # Reusable React components.
│   ├── ui/       # UI components from shadcn/ui.
│   ├── CurrentWeatherCard.tsx
│   ├── HourlyWeatherTabs.tsx
│   ├── Map.tsx
│   ├── PageHeader.tsx
│   ├── SearchDialog.tsx
│   └── WeatherProvider.tsx # Context provider for weather data.
├── config/       # Application constants and configuration.
├── hooks/        # Custom React hooks (e.g., useWeather).
├── lib/          # Utility functions.
└── types/        # TypeScript type definitions for API responses.
