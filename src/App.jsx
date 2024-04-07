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

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import ParticlesComponent from "./components/shared/ParticleComponent.jsx";

function App() {
  /*
  Spider chart
  Stacked Area
  Sankey
  Donut
  Bubble Map
*/

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
      </div>
    </>
  );
}

export default App;
