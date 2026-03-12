# Advanced Weather App (Full-Stack Edition)

A modern, responsive weather forecast application built with React, TypeScript, and Vite. 

### 🚀 The Upscale
I originally started this project following a foundational tutorial by [@codewithsadee](https://www.youtube.com/@codewithsadee), but I have since **upscaled** it with significant full-stack enhancements to turn it into a high-performance SaaS-like application.

## 🛠️ My Enhancements (Beyond the Tutorial)

-   **Supabase Full-Stack Integration:** I integrated a PostgreSQL database to allow users to save and persist their favorite locations in the cloud.
-   **Secure Authentication:** Implemented a complete User Auth flow (Sign Up/Sign In) with personalized metadata (Display Names).
-   **Row-Level Security (RLS):** Engineered secure database policies to ensure user data isolation.
-   **Dynamic Weather Backdrops:** Developed a real-time atmospheric background system that changes based on live weather condition codes.
-   **Glassmorphism Aesthetic:** Overhauled the UI with a modern "frosted glass" look using backdrop blurs and semi-transparent layers.
-   **Motion Design:** Integrated `framer-motion` for smooth, declarative animations across tabs and background shifts.

## Core Features

-   **Current Weather:** Displays real-time data including temperature, "feels like," wind, humidity, and more.
-   **Hourly Forecasts:** Interactive, animated tabs for detailed hourly metrics (UV, Pressure, Visibility, etc.).
-   **Interactive Map:** Mapbox integration with dynamic markers and personalized camera centering.
-   **Favorites Sidebar:** A dedicated, authenticated slide-out drawer to manage your saved locations.
-   **Theme & Unit Control:** Full support for Dark/Light modes and Metric/Imperial conversions.

## Tech Stack

-   **Framework:** React 19, TypeScript, Vite
-   **Backend:** Supabase (PostgreSQL, Auth, RLS)
-   **Styling:** Tailwind CSS, shadcn/ui
-   **Animations:** Framer Motion
-   **Data Fetching:** Axios
-   **Mapping:** Mapbox GL JS
-   **Charting:** Recharts
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
