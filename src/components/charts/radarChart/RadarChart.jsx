/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import * as d3 from "d3";

const RadarChart = ({ data, keys }) => {
  const svgRef = useRef();

  useEffect(() => {

    const svgOuter = d3.select(svgRef.current),
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

      const arcGen = (innerRadius, outerRadius, startAngle, endAngle) => d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle);

    const innerFirstCircle = (startAngle, endAngle) => {
      return arcGen((domainheight / 8) + 8, (domainheight / 8) - 8, startAngle, endAngle);
  };
  const innerSecondCircle = (startAngle, endAngle) => {
      return arcGen((domainheight / 4) + 6, (domainheight / 4) - 6, startAngle, endAngle);
  };
  const innerThirdCircle = (startAngle, endAngle) => {
      return arcGen((domainheight / 8 * 3) + 4, (domainheight / 8 * 3) - 4, startAngle, endAngle);
  };
  const innerFourthCircle = (startAngle, endAngle) => {
      return arcGen((domainheight / 2) + 2, (domainheight / 2) - 2, startAngle, endAngle);
  };
  const circleTransform = 'translate(' + (domainwidth / 2) + 'px, ' + (domainheight / 2) + 'px)';
const GREEN = '#84BFA4';
const green = svg.append('g')
    .attr('class', 'green');

// green background gradient area
green.append('rect')
    .attr('width', domainwidth / 2)
    .attr('height', domainheight / 2)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', 'url(#green-radial-gradient)')
    .style('opacity', .25);

// green circle borders
green.append('path')
    .attr('fill', GREEN)
    .attr('d', innerFirstCircle(3 * Math.PI / 2, 4 * Math.PI / 2))
    .style('transform', circleTransform);
green.append('path')
    .attr('fill', GREEN)
    .attr('d', innerSecondCircle(3 * Math.PI / 2, 4 * Math.PI / 2))
    .style('transform', circleTransform);
green.append('path')
    .attr('fill', GREEN)
    .attr('d', innerThirdCircle(3 * Math.PI / 2, 4 * Math.PI / 2))
    .style('transform', circleTransform);
green.append('path')
    .attr('fill', GREEN)
    .attr('d', innerFourthCircle(3 * Math.PI / 2, 4 * Math.PI / 2))
    .style('transform', circleTransform);

    
  }, [data, keys]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default RadarChart;
