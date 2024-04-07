import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HEIGHT, WIDTH } from '../chart.constants';

const StreamChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    svg.selectAll('*').remove();

    const keys = Object.keys(data[0]).slice(1);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d3.min(keys, key => d[key])), d3.max(data, d => d3.max(keys, key => d[key]))])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#d0bdf4', '#8458B3', '#a28089']);

    const stackedData = d3.stack()
      .keys(keys)
      .offset(d3.stackOffsetDiverging)(data);

    svg.selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .style("fill", d => color(d.key))
      .attr("d", d3.area()
        .x(d => x(d.data.year))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
      );
  }, []);

  return <div ref={svgRef} width={WIDTH} height={HEIGHT}></div>;
};

export default StreamChart;
