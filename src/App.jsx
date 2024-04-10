import BarChart from "./components/charts/barChart/BarChart.jsx";
import LineChart from "./components/charts/lineChart/LineChart.jsx";
import RadarChart from "./components/charts/radarChart/RadarChart.jsx";
import "./App.css";
import {
  barData,
  lineData,
  radarChartData,
  sankeyNodes,
  sankeyLinks,
  densityData,
  streamData,
  pieData,
} from "./data/chartData";
import SankeyChart from "./components/charts/sankeyChart/SankeyChart.jsx";
import RidgeLine from "./components/charts/ridgeLine/RidgeLine.jsx";
import StreamChart from "./components/charts/streamChart/StreamChart.jsx";
import PieChart from "./components/charts/pieChart/PieChart.jsx";

import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card.jsx";

import ParticlesComponent from "./components/shared/ParticleComponent.jsx";

function App() {
  const notifications = [
    {
      title: "Add interactivity to the charts."
    },
    {
      title: "Add storybook to the codebase."
    },
    {
      title: "Add more charts and dc.js examples"
    },
  ]
  const charts = [
    <RadarChart key="Radar Chart" data={radarChartData} />,
    <SankeyChart key="Sankey Chart" nodes={sankeyNodes} links={sankeyLinks} />,
    <RidgeLine key="Ridge Line Chart" data={densityData} />,
    <StreamChart key="Stream Chart" data={streamData} />,
    <BarChart key="Bar Chart" data={barData} />,
    <PieChart key="Pie Chart" data={pieData} />,
    <LineChart key="Line Chart" data={lineData} />,
  ];

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="header">
        <p> Parth Shukla D3.js exploration </p>
      </div>
      <div className="app-container">
        {charts.map((chart, index) => (
          <Card key={index} className="row">
            <CardHeader>
              <CardTitle>{chart.key}</CardTitle>
            </CardHeader>
            <CardContent>{chart}</CardContent>
          </Card>
        ))}

        <Card className="row">
          <CardHeader>
            <CardTitle>Future Goals</CardTitle>
            <CardDescription>Would love to have any contributions ;).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p> */}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
