import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Regional Head",
//     value: 120,
//   },
//   {
//     name: "Zonal Manager",
//     value: 300,
//   },
//   {
//     name: "Area Managar",
//     value: 868,
//   },
//   {
//     name: "Sales Person",
//     value: 1397,
//   },
// ];

function ReHorizontalBarChart({ strokeColor, data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        layout="vertical"
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 20,
        }}
      >
        {/* <CartesianGrid stroke="#f5f5f5" /> */}
        <XAxis type="number" stroke={strokeColor} />
        <YAxis
          dataKey="name"
          type="category"
          scale="band"
          stroke={strokeColor}
        />
        <Tooltip />
        {/* <Legend /> */}

        <Bar dataKey="value" name="Total" barSize={20} fill="#00C893" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default ReHorizontalBarChart;
