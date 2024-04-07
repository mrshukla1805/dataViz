/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { WIDTH, HEIGHT } from '../chart.constants';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear existing content

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0]);

    const line = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#a28089')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

  }, [data]);

  return (
    <svg ref={svgRef} width={WIDTH} height={HEIGHT}></svg>
  );
};

export default LineChart;
