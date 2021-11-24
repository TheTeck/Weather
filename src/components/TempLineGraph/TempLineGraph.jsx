import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './TempLineGraph.scss';

export default function TempLineGraph ({ hourly }) {

    const svgRef = useRef();
    const w = 1000;
    const h = 130;
    let data = hourly.map(hour => hour.temp).slice(0, 24);
    let max = data.reduce((acc, d) => {
        return d > acc ? d : acc;
    }, data[0]);
    let min = data.reduce((acc, d) => {
        return d < acc ? d : acc;
    }, data[0]);

    useEffect(() => {
        d3.selectAll("g > *").remove()

        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')

        const xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, w])
        
        const yScale = d3.scaleLinear()
            .domain([~~min - 5, ~~max + 5])
            .range([h, 0])

        const generateScaledLine = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal)
        
        svg.selectAll('.line')
            .data(data)
            .join('path')
                .attr('d', d => generateScaledLine(d))
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 3)
        
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => i % 2 ? i + 1 : '')
        
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
        
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
    
        svg.append('g')
            .call(yAxis)
    }, [data])

    return (
        <div id="templinegraph-container">
            <svg ref={svgRef}></svg>
        </div>
    )
}