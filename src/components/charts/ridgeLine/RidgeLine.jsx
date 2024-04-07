/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HEIGHT, WIDTH } from '../chart.constants';

const RidgeLine = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 60, right: 30, bottom: 20, left: 110 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll('*').remove();

    // Get the different categories and count them
    const categories = Object.keys(data[0]);
    const n = categories.length;

    // Add X axis
    const x = d3.scaleLinear()
      .domain([-10, 140])
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Create a Y scale for densities
    const y = d3.scaleLinear()
      .domain([0, 0.4])
      .range([height, 0]);

    // Create the Y axis for names
    const yName = d3.scaleBand()
      .domain(categories)
      .range([0, height])
      .paddingInner(1);
    svg.append("g")
      .call(d3.axisLeft(yName));

    // Compute kernel density estimation for each column:
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)); // increase this 40 for more accurate density.
    const allDensity = [];
    for (let i = 0; i < n; i++) {
      const key = categories[i];
      const density = kde(data.map(d => +d[key]));
      allDensity.push({ key: key, density: density });
    }

    // Add areas
    svg.selectAll("areas")
      .data(allDensity)
      .enter()
      .append("path")
      .attr("transform", function (d) { return `translate(0,${yName(d.key) - height})`; })
      .datum(function (d) { return d.density; })
      .attr("fill", "#8458B3")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return x(d[0]); })
        .y(function (d) { return y(d[1]); })
      );
  }, []);

  return <div ref={svgRef} width={WIDTH} height={HEIGHT}  ></div>;
};

export default RidgeLine;

// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(function (x) {
      return [x, d3.mean(V, function (v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function (v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}
