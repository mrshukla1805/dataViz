import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { WIDTH, HEIGHT } from '../chart.constants';


const PieChart = ({data}) => {
  const svgRef = useRef(null);

  data = Object.entries(data).map(([key, value]) => ({ key, value }));

  useEffect(() => {
    const width = 450;
    const height = 450;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

      
    svg.selectAll('*').remove();


    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(['#a0d2eb','#e5eaf5','#d0bdf4','#8458B3','#a28089','#60bdf4']);

        const pie = d3.pie()
        .sort(null)
        .value(function (d) { return d.value; });
        const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) { return color(d.data.key); })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    svg.selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d) ;
        var posB = outerArc.centroid(d);
        var posC = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    svg.selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) { return d.data.key; })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.85 * (midangle < Math.PI ? 1 : -1);
        pos[1] -= 5
        return `translate(${pos})`;
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return (midangle < Math.PI ? 'start' : 'end');
      });
  }, []);

  return <div id="my_dataviz" ref={svgRef} width={WIDTH} height={HEIGHT}></div>;
};

export default PieChart;
