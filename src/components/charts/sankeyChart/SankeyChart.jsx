import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { HEIGHT, WIDTH } from '../chart.constants';

const SankeyChart = ({ nodes, links }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!nodes) return;


    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [350 - 1, 350 - 6]]);

    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator({
      nodes: nodes.map(d => ({ ...d })),
      links: links.map(d => ({ ...d })),
    });

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove();

    const link = svg
      .append('g')
      .selectAll('.link')
      .data(sankeyLinks)
      .join('path')
      .attr('class', 'link')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke-width', d => Math.max(1, d.width - 3))
      .style('stroke', '#a0d2eb')
      .style('stroke-dasharray', 2) 
      .style('stroke-opacity', 0.7)
      .style('fill', 'none');

    link.append('title').text(d => `${d.source.name} → ${d.target.name}\n${d.value}`);

    const node = svg
      .append('g')
      .selectAll('.node')
      .data(sankeyNodes)
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    node
      .append('rect')
      .attr('height', d => d.y1 - d.y0)
      .attr('width', sankeyGenerator.nodeWidth())
      .style('fill', '#d0bdf4')
      .style('stroke', '#000');

    node
      .append('text')
      .attr('x', -6)
      .attr('y', d => (d.y1 - d.y0) / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .text(d => d.name)
      .filter(d => d.x0 < 800 / 2)
      .attr('x', 6 + sankeyGenerator.nodeWidth())
      .attr('text-anchor', 'start');
  }, []);

  return <svg ref={svgRef} width={WIDTH} height={HEIGHT}></svg>;
};

export default SankeyChart;
