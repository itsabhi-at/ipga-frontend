import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const PieChartV2 = ({ data }) => {
  const customColors = {
    "Category A": "#000000",
    "Category B": "#373737",
    "Category C": "#4a4a4a",
    "Category D": "#747474",
    "Category E": "#939393",
    "Category F": "#cbcbcb",
    "Category G": "#cfcfcf",
    // Add more colors for your categories as needed
  };

  const [tooltip, setTooltip] = useState({
    display: false,
    label: "",
    x: 0,
    y: 0,
  });
  const svgRef = useRef(null);

  const legendColorScale = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.label))
    .range(Object.values(customColors));
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.attr("width");
    const height = svg.attr("height");
    const radius = Math.min(width, height) / 2;

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    // const color = d3
    //   .scaleOrdinal()
    //   .domain(data.map((d) => d.label))
    //   .range(d3.schemeCategory10);
    // Create a color scale based on the labels in your dataset and custom colors
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(Object.values(customColors)); // Use custom colors

    const arcs = svg
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .on("mouseover", (e, d) => {
        // Show tooltip on hover
        setTooltip({
          display: true,
          label: d.data.label,
          x: e.clientX,
          y: e.clientY,
        });
      })
      .on("mouseout", () => {
        // Hide tooltip on mouseout
        setTooltip({ ...tooltip, display: false });
      });

    // Add labels to the pie chart
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle");
    // .text((d) => d.data.label);
  }, []);

  return (
    <div className="pie-chart2 flex flex-col w-full items-center justify-center mx-auto mt-12">
      <svg ref={svgRef} width={"200"} height={"200"}></svg>
      {tooltip.display && (
        <div
          className="tooltip2 bg-white p-2 rounded-md"
          style={{
            position: "absolute",
            left: tooltip.x + 10 + "px",
            top: tooltip.y + 300 + "px",
          }}
        >
          {tooltip.label}
        </div>
      )}
      <div className="legend2 w-full mt-4 space-y-2">
        {data.map((item) => (
          <div
            key={item.label}
            className="legend-item flex items-center justify-center w-full gap-4"
          >
            <div
              className="color-box h-4 w-4"
              style={{ backgroundColor: legendColorScale(item.label) }}
            ></div>
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartV2;
