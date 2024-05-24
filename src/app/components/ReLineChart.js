import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ReLineChart({ data, strokeColor, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" stroke={strokeColor} />
        <YAxis stroke={strokeColor} />
        <Tooltip />
        {/* <Legend /> */}
        {/* <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
        <Line
          name="Avg Value"
          type="monotone"
          dataKey={dataKey ? dataKey : "pv"}
          stroke="#FDB35F"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ReLineChart;
