import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ChartsData } from '../../App';

interface SimulationNodeDatum extends d3.SimulationNodeDatum {
    username: string;
    value: number;
}

type BubbleChartProps = {
    data: ChartsData[];
    size: {
        width: number;
        height: number;
    };
};

const BubbleChart: React.FC<BubbleChartProps> = ({ data, size }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        svg.attr('viewBox', `0 0 ${size.width} ${size.height}`).attr('preserveAspectRatio', 'xMidYMid meet');

        const simulationData: SimulationNodeDatum[] = data.map((d) => ({
            x: Math.random() * size.width,
            y: Math.random() * size.height,
            username: d.username,
            value: d.totalCodingTimeMins,
        }));

        const simulation = d3
            .forceSimulation<SimulationNodeDatum>(simulationData)
            .force('x', d3.forceX(size.width / 2).strength(0.1))
            .force('y', d3.forceY(size.height / 2).strength(0.1))
            .force(
                'collision',
                d3.forceCollide<SimulationNodeDatum>((d) => Math.sqrt(d.value) * 2.5 + 1),
            )
            .on('tick', ticked);

        function ticked() {
            svg.selectAll('circle')
                .data(simulationData)
                .join('circle')
                .attr('r', (d) => Math.sqrt(d.value) * 2.5)
                .attr('cx', (d) => d.x!)
                .attr('cy', (d) => d.y!)
                .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
                .attr('stroke', '#fff')
                .attr('stroke-size.width', 2);

            svg.selectAll('text')
                .data(simulationData)
                .join('text')
                .attr('x', (d) => d.x!)
                .attr('y', (d) => d.y!)
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('font-size', '12px')
                .attr('fill', '#fff')
                .text((d) => d.username);
        }

        return () => {
            simulation.stop();
        };
    }, [data, size.width, size.height]);

    return <svg ref={svgRef} width={size.width} height={size.height} />;
};

export default BubbleChart;
