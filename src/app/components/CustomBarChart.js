import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CustomBarChart = ({ data, customHeight, customWidth }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Function to update the chart
    const updateChart = () => {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      // Get the current dimensions of the parent container
      const parentWidth = svg.node().parentElement.clientWidth;
      const parentHeight = svg.node().parentElement.clientHeight;

      // Define margins, width, and height based on the parent container dimensions
      const margin = { top: 20, right: 0, bottom: 0, left: 40 };
      const width = parentWidth - margin.left - margin.right;
      const height = parentHeight - margin.top - margin.bottom;

      // Update the SVG's viewBox to maintain aspect ratio
      svg.attr("viewBox", `0 0 ${parentWidth} ${parentHeight}`);

      // Update the scales and other chart elements based on the new dimensions
      // ...
      // Your chart code here, using the updated 'width' and 'height'

      const xScale = d3
        .scaleBand()
        .domain(data?.map((d) => d.label))
        .range([margin.left, width - margin.right])
        .padding(0.7);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .nice()
        .range([height - margin.bottom, margin.top]);
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(0)");
      const yAxis = svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

      // Style to remove axis lines
      yAxis.select(".domain").remove(); // Remove y-axis line

      yAxis.selectAll(".tick line").remove(); // Remove y-axis tick lines

      yAxis.selectAll("text").style("fill", "#979592");

      // Add horizontal grid lines

      const gridGroup = svg.append("g");
      yScale.ticks(5).forEach((tick) => {
        gridGroup
          .append("line")
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
          .attr("y1", yScale(tick))
          .attr("y2", yScale(tick))
          .attr("stroke", "#363638")
          .attr("stroke-opacity", 0.5);
      });

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.label))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(0) - yScale(d.value))
        .attr("fill", "#0777E8")
        .on("mouseover", (event, d) => {
          // Show tooltip on hover
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(`${d.label}: ${d.value}`)
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
          // Hide tooltip on mouseout
          tooltip.transition().duration(500).style("opacity", 0);
        });

      // Add a tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip absolute bg-white")
        .style("opacity", 0);

      return () => {
        // Clean up the tooltip
        tooltip.remove();
      };
    };

    // Call the updateChart function initially
    updateChart();

    // Attach a resize event listener to the window to update the chart on resize
    window.addEventListener("resize", updateChart);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", updateChart);
    };
  }, []);

  return <svg className="h-fit" ref={svgRef}></svg>;
};

export default CustomBarChart;
