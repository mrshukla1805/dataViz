/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import * as d3 from "d3";

const RadarChart = ({ data, keys }) => {
  const svgRef = useRef();

  useEffect(() => {

    const svgOuter = d3.select(svgRef.current);,
      margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 900,
      height = 900,
      domainwidth = width - margin.left - margin.right,
      domainheight = height - margin.top - margin.bottom,
      tooltip = d3.select(".tooltip");

    svgOuter.attr(
      "viewBox",
      "0 0 " +
        (width + margin.left + margin.right) +
        " " +
        (height + margin.top + margin.bottom)
    );

    const svg = svgOuter
      .append("g")
      .style(
        "transform",
        "translate(" + margin.left + "px, " + margin.top + "px)"
      );

    const x = d3.scaleLinear().domain([-4, 4]).range([0, domainwidth]);
    const y = d3.scaleLinear().domain([-4, 4]).range([domainheight, 0]);

    const xAxis = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + y.range()[0] / 2 + ")");

    xAxis
      .call(d3.axisBottom(x).ticks(6))
      .call((g) => g.selectAll(".tick text").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) => g.selectAll(".domain").remove());

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
      .call(d3.axisLeft(y).ticks(6))
      .call((g) => g.selectAll(".tick text").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) => g.selectAll(".domain").remove());
  }, [data, keys]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default RadarChart;
