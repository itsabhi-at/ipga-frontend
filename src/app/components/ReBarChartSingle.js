"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ReBarChartSingle({
  data,
  barColor,
  legend,
  strokeColor,
  dataKey,
  dataKeyX,
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="" /> */}
        <XAxis dataKey={dataKeyX ? dataKeyX : "name"} stroke={strokeColor} />
        <YAxis stroke={strokeColor} />
        <Tooltip />
        {legend ? <Legend /> : ""}
        {/* <Bar
        name="Actual Sales"
        dataKey="actualSales"
        fill="#FDB35F"
        activeBar={<Rectangle stroke="black" />}
      /> */}
        <Bar
          barSize={20}
          radius={[4, 4, 0, 0]}
          name="Top Sales"
          dataKey={dataKey}
          fill={barColor}
          activeBar={<Rectangle stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ReBarChartSingle;
