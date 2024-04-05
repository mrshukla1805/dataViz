/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import * as d3 from "d3";

const RadarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svgOuter = d3.select(svgRef.current),
      margin = { top: 20, right: 20, bottom: 20, left: 20 },
      width = 900,
      height = 900,
      domainwidth = width - margin.left - margin.right,
      domainheight = height - margin.top - margin.bottom;

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

    const arcGen = (innerRadius, outerRadius, startAngle, endAngle) =>
      d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);

    const innerFirstCircle = (startAngle, endAngle) => {
      return arcGen(
        domainheight / 8 + 8,
        domainheight / 8 - 8,
        startAngle,
        endAngle
      );
    };
    const innerSecondCircle = (startAngle, endAngle) => {
      return arcGen(
        domainheight / 4 + 6,
        domainheight / 4 - 6,
        startAngle,
        endAngle
      );
    };
    const innerThirdCircle = (startAngle, endAngle) => {
      return arcGen(
        (domainheight / 8) * 3 + 4,
        (domainheight / 8) * 3 - 4,
        startAngle,
        endAngle
      );
    };
    const innerFourthCircle = (startAngle, endAngle) => {
      return arcGen(
        domainheight / 2 + 2,
        domainheight / 2 - 2,
        startAngle,
        endAngle
      );
    };
    const circleTransform =
      "translate(" + domainwidth / 2 + "px, " + domainheight / 2 + "px)";
    const GREEN = "#84BFA4";
    const green = svg.append("g").attr("class", "green");

    // green background gradient area
    green
      .append("rect")
      .attr("width", domainwidth / 2)
      .attr("height", domainheight / 2)
      .attr("x", 0)
      .attr("y", 0)
      .attr("fill", "url(#green-radial-gradient)")
      .style("opacity", 0.25);

    // green circle borders
    green
      .append("path")
      .attr("fill", GREEN)
      .attr("d", innerFirstCircle((3 * Math.PI) / 2, (4 * Math.PI) / 2))
      .style("transform", circleTransform);
    green
      .append("path")
      .attr("fill", GREEN)
      .attr("d", innerSecondCircle((3 * Math.PI) / 2, (4 * Math.PI) / 2))
      .style("transform", circleTransform);
    green
      .append("path")
      .attr("fill", GREEN)
      .attr("d", innerThirdCircle((3 * Math.PI) / 2, (4 * Math.PI) / 2))
      .style("transform", circleTransform);
    green
      .append("path")
      .attr("fill", GREEN)
      .attr("d", innerFourthCircle((3 * Math.PI) / 2, (4 * Math.PI) / 2))
      .style("transform", circleTransform);

    const pi = Math.PI;
    const calculateDot = (element, x, y) => {
      // radian between 5 and 85
      const randomDegree = ((Math.random() * 80 + 5) * pi) / 180;
      const circle = element.circle - 0.2;
      const r = Math.random() * 0.6 + (circle - 0.6);
      // multiples of PI/2
      // loops through every quadrant starting from top left, bottom left, bottom right, top right
      const shift = (pi * [1, 4, 3, 2][element.quadrant - 1]) / 2;

      return {
        xValue: x(Math.cos(randomDegree + shift) * r),
        yValue: y(Math.sin(randomDegree + shift) * r),
      };
    };

    const checkDistanceBetweenDots = (x1, x2, y1, y2) => {
      const a = x2 - x1;
      const b = y2 - y1;
      return Math.sqrt(a * a + b * b);
    };

    const values = data.reduce((list, element) => {
      const entry = {
        x: null,
        y: null,
        text: element.text,
        quadrant: element.quadrant,
        fillColor: ["green", "blue", "red", "orange"][element.quadrant - 1],
      };

      let dot;
      do {
        dot = calculateDot(element, x, y);
        // calculate this exact dot new until it has a distance to every other dot that is longer than 28 (2x dot radius)
      } while (
        list.some(
          (item) =>
            checkDistanceBetweenDots(dot.xValue, item.x, dot.yValue, item.y) <
            20
        )
      );

      entry.x = dot.xValue;
      entry.y = dot.yValue;

      list.push(entry);

      return list;
    }, []);

    svg
      .append("g")
      .attr("class", "circles")
      .selectAll("circle")
      .data(values)
      .enter()
      .append("circle")
      .attr("class", (d) => "dot is-" + d.fillColor)
      .attr("r", 5)
      .attr("data-value", (d) => d.text)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default RadarChart;
