

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OverviewChart } from "@/components/OverviewChart";
import { PrecipitationChart } from "@/components/PrecipitationChart";
import { WindChart } from "@/components/WindChart";
import { HumidityChart } from "@/components/HumidityChart";
import { CloudCoverChart } from "@/components/CloudCoverChart";
import { PressureChart } from "@/components/PressureChart";
import { UVChart } from "@/components/UVChart";
import { VisibilityChart } from "@/components/VisibilityChart";
import { FeelsLikeChart } from "@/components/FeelsLikeChart";
/**
 * Types
 */
type Tab =
  | 'overview'
  | 'precipitation'
  | 'wind'
  | 'humidity'
  | 'cloudCover'
  | 'pressure'
  | 'uv'
  | 'visibility'
  | 'feelsLike';

/**
 * Constants
 */
const TABS_LIST = [
  {
    title: 'Overview',
    value: 'overview',
  },
  {
    title: 'Precipitation',
    value: 'precipitation',
  },
  {
    title: 'Wind',
    value: 'wind',
  },
  {
    title: 'Humidity',
    value: 'humidity',
  },
  {
    title: 'Cloud cover',
    value: 'cloudCover',
  },
  {
    title: 'Pressure',
    value: 'pressure',
  },
  {
    title: 'UV',
    value: 'uv',
  },
  {
    title: 'Visibility',
    value: 'visibility',
  },
  {
    title: 'Feels like',
    value: 'feelsLike',
  },
];

export const HourlyWeatherTabs = () => {
    //States
    const[tab, setTab] = useState<Tab>('overview');
    return (
        <Tabs value={tab} onValueChange={(value) => setTab(value as Tab)}
        className="py-4 gap-4">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Hourly</h2>

                <TabsList className="bg-background/20 backdrop-blur-md gap-2 overflow-x-auto overflow-y-hidden justify-start" style={{ scrollbarWidth : "none"}}>
                    {TABS_LIST.map((item => (<TabsTrigger key={item.value} value={item.value} className="border-none bg-background/40 h-9 px-4 rounded-full data-[state=active]:bg-primary! data-[state=active]:text-background transition-all">{item.title}</TabsTrigger>)))}
                </TabsList>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
            {/*Overview Tab*/}
            <TabsContent value="overview">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <OverviewChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*Precipitation Tab*/}
            <TabsContent value="precipitation">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Precipitation</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <PrecipitationChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*Wind Tab*/}
            <TabsContent value="wind">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Wind</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <WindChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*Humidity Tab*/}
            <TabsContent value="humidity">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Humidity</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <HumidityChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*Cloud Cover Tab*/}
            <TabsContent value="cloudCover">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Cloud Cover</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <CloudCoverChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*Pressure Chart Tab*/}
            <TabsContent value="pressure">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Pressure Chart</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <PressureChart />
                    </CardContent>
                </Card>
            </TabsContent>

            {/*UV Chart Tab*/}
            <TabsContent value="uv">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>UV Chart</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <UVChart />
                    </CardContent>
                </Card>
            </TabsContent>   

            {/*Visibility Chart Tab*/}
            <TabsContent value="visibility">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Visibility Chart</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <VisibilityChart />
                    </CardContent>
                </Card>
            </TabsContent> 

            {/*Feels like Chart Tab*/}
            <TabsContent value="feelsLike">
                <Card className="bg-background/60 dark:bg-card/40 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                        <CardTitle>Feels like Chart</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <FeelsLikeChart />
                    </CardContent>
                </Card>
            </TabsContent>                            
                </motion.div>
            </AnimatePresence>
        </Tabs>
    )
}