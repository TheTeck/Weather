import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import './TempLineGraph.scss';

export default function TempLineGraph ({ hourly, timeOffset }) {

    const svgRef = useRef();
    const w = 1000;
    const h = 130;
    let data = hourly.map(hour => hour.temp).slice(0, 25);
    let max = data.reduce((acc, d) => {
        return d > acc ? d : acc;
    }, data[0]);
    let min = data.reduce((acc, d) => {
        return d < acc ? d : acc;
    }, data[0]);

    const getHour = i => {
        const hourTime = new Date((hourly[i].dt + timeOffset +(new Date().getTimezoneOffset() * 60)) * 1000);
        let hourTimeHour = hourTime.getHours() % 12 ? hourTime.getHours() % 12 : 12;
        let antePost = hourTime.getHours() < 12 ? 'am' : 'pm'
        return hourTimeHour + antePost;
    }

    useEffect(() => {
        d3.selectAll("g > *").remove();
        d3.selectAll('path').remove();

        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')

        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, w])
        
        const yScale = d3.scaleLinear()
            .domain([~~min - 5, ~~max + 5])
            .range([h, 0])

        const generateScaledLine = d3.line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal)
        
        svg.selectAll('.line')
            .data([data])
            .join('path')
              .attr('d', d => generateScaledLine(d))
              .attr('fill', 'none')
              .attr('stroke', 'orange')
              .attr('stroke-width', 4)
        
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)
            .tickFormat(i => i % 2 ? getHour(i) : '')
            
        
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickFormat(d => d + '\u00B0')
        
        svg.append('g')
            .style('font-size', '16px')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`)
    
        svg.append('g')
            .style('font-size', '16px')
            .call(yAxis)
    }, [data])

    return (
        <section id="templinegraph-container">
            <p id="linegraph-header">24-Hour Temperatures</p>
            <div id="svg-wrapper">
                <svg ref={svgRef}></svg>
            </div>
        </section>
    )
}