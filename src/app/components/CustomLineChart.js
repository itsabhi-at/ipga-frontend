// // CustomLineChart.js
// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const CustomLineChart = ({ data, customHeight, customWidth }) => {
//   const svgRef = useRef();

//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   useEffect(() => {
//     const margin = { top: 20, right: 0, bottom: 40, left: 0 };
//     const width = customWidth - margin.left - margin.right;
//     const height = customHeight - margin.top - margin.bottom;

//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", "100%") // Set width to be responsive
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const xScale = d3
//       .scaleBand()
//       .domain(data.map((d, i) => i))
//       .range([0, width])
//       .padding(0.1);

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data)])
//       .range([height, 0]);

//     const line = d3
//       .line()
//       .x((d, i) => xScale(i) + xScale.bandwidth() / 2)
//       .y((d) => yScale(d))
//       .curve(d3.curveCardinal);

//     const xAxis = d3
//       .axisBottom(xScale)
//       .tickFormat((i) => monthNames[i])
//       .tickSize(0);

//     svg
//       .append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0,${height})`)
//       .call(xAxis)
//       .selectAll("text")
//       .style("fill", "#979592"); // Set x-axis label color

//     svg.select(".domain").remove(); // Remove x-axis line

//     svg
//       .append("defs") // Add a definition for the shadow filter
//       .append("filter")
//       .attr("id", "line-shadow")
//       .append("feDropShadow")
//       .attr("dx", 0)
//       .attr("dy", 2) // Adjust vertical offset for shadow
//       .attr("stdDeviation", 4) // Adjust blur amount for shadow
//       .attr("flood-color", "#0777E8"); // Set the shadow color

//     svg
//       .append("path")
//       .datum(data)
//       .attr("fill", "none")
//       .attr("stroke", "#0777E8") // Set the line color
//       .attr("stroke-width", 4) // Increase the line thickness
//       .attr("d", line)
//       .style("filter", "url(#line-shadow)"); // Apply the shadow filter
//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

// export default CustomLineChart;

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CustomLineChart = ({ data, customHeight, customWidth }) => {
  const svgRef = useRef();
  const svgGroupRef = useRef();
  const yAxisRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const margin = { top: 0, right: 40, bottom: 40, left: 40 };
    const width = customWidth - margin.left - margin.right;
    const height = customHeight - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom);

    const svgGroup = d3
      .select(svgGroupRef.current)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const yAxisGroup = d3
      .select(yAxisRef.current)
      .attr("transform", `translate(${width}, 0)`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.label))
      .y((d) => yScale(d.value))
      .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const yAxis = d3.axisRight(yScale).tickSize(0);

    svgGroup.select(".x-axis").remove();
    svgGroup.select(".y-axis").remove();
    svgGroup.selectAll(".dot").remove();
    svgGroup.select(".tooltip").remove();

    svgGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("fill", "#979592");

    yAxisGroup.select(".domain").remove();
    // yAxisGroup.select(".y-axis").remove();
    yAxisGroup
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("fill", "#979592");

    svgGroup.select("path").remove();
    svgGroup
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0777E8")
      .attr("stroke-width", 4)
      .attr("d", line)
      .style("filter", "url(#line-shadow)");

    // Add dots to represent data points
    svgGroup
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.label))
      .attr("cy", (d) => yScale(d.value))
      .attr("r", 4)
      .style("fill", "#0777E8")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select(tooltipRef.current);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`${d.label}: ${d.value}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 200}px`);
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current)
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
  }, [data, customWidth, customHeight]);

  return (
    <div style={{ position: "relative" }}>
      <svg ref={svgRef}>
        <g ref={svgGroupRef} />
        <g ref={yAxisRef} />
      </svg>
      <div
        className="tooltip"
        ref={tooltipRef}
        style={{
          position: "absolute",
          background: "white",
          border: "1px solid #ccc",
          padding: "5px",
          opacity: 0,
        }}
      ></div>
    </div>
  );
};

export default CustomLineChart;
