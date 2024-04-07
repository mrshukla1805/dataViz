import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatMapChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 80, right: 25, bottom: 30, left: 40 };
    const width = 450 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    const mouseover = function (d) {
      tooltip
        .style("opacity", 1);
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1);
    };

    const mousemove = function (d) {
      tooltip
        .html("The exact value of<br>this cell is: " + d.value)
        .style("left", (d3.mouse(this)[0] + 70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px");
    };

    const mouseleave = function (d) {
      tooltip
        .style("opacity", 0);
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8);
    };

    const myGroups = d3.map(data, function (d) { return d.group; }).keys();
    const myVars = d3.map(data, function (d) { return d.variable; }).keys();

    const x = d3.scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove();

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(myVars)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove();

    const myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 100]);

    svg.selectAll()
      .data(data, function (d) { return d.group + ':' + d.variable; })
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.group); })
      .attr("y", function (d) { return y(d.variable); })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function (d) { return myColor(d.value); })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    svg.append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("A d3.js heatmap");

    svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A short description of the take-away message of this chart.");
  }, []);

  return <div id="my_dataviz" ref={svgRef}></div>;
};

export default HeatMapChart;
