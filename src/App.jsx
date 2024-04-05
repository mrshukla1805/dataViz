import  BarChart  from './components/charts/barChart/BarChart.jsx'
import  LineChart  from './components/charts/lineChart/LineChart.jsx'
import RadarChart from './components/charts/radarChart/RadarChart.jsx'
import './App.css'
import { barData, lineData, radarChartData, sankeyNodes, sankeyLinks, densityData } from './data/chartData'
import SankeyChart from './components/charts/sankeyChart/SankeyChart.jsx'
import RidgeLinePlot from './components/charts/ridgeLine/RidgeLine.jsx'

function App() {

/*
  Spider chart
  Stacked Area
  Sankey
  Donut
  Bubble Map
*/

  return (
    <>
      <BarChart data={barData} />      
      <LineChart data={lineData} />
      <RadarChart data={radarChartData} />
      <SankeyChart nodes={sankeyNodes} links={sankeyLinks} />
      <RidgeLinePlot data={densityData} />
    </>
  )
}

export default App
