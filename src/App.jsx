import  BarChart  from './components/charts/barChart/BarChart.jsx'
import  LineChart  from './components/charts/lineChart/LineChart.jsx'
import RadarChart from './components/charts/radarChart/RadarChart.jsx'
import './App.css'
import { barData, lineData, radarChartData, radarChartCategory } from './data/chartData'

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
      <RadarChart data={radarChartData} keys={radarChartCategory} />
    </>
  )
}

export default App
