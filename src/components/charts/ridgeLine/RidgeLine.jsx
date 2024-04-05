import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RidgeLinePlot = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = 600 - margin.left - margin.right;
    const innerHeight = 400 - margin.top - margin.bottom;

    const categories = [...new Set(data.map(d => d.category))];
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, innerWidth]);

    const y = d3.scalePoint()
      .domain(categories)
      .range([margin.top, innerHeight]);

    const line = d3.line()
      .x(d => x(d.value))
      .y(d => y(d.category))
      .curve(d3.curveBasis);

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const paths = g.selectAll('.path')
      .data(categories)
      .enter().append('path')
      .attr('class', 'path')
      .attr('d', category => line(data.filter(d => d.category === category)))
      .style('fill', 'none')
      .style('stroke', 'steelblue')
      .style('stroke-opacity', 0.4);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

  }, []);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default RidgeLinePlot;
