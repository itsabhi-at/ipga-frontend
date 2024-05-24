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

const data = [
  {
    name: "Jan",
    targetSales: 4000,
    actualSales: 2400,
  },
  {
    name: "Feb",
    targetSales: 3000,
    actualSales: 1398,
  },
  {
    name: "Mar",
    targetSales: 2000,
    actualSales: 9800,
  },
  {
    name: "Apr",
    targetSales: 2780,
    actualSales: 3908,
  },
  {
    name: "May",
    targetSales: 1890,
    actualSales: 4800,
  },
  {
    name: "Jun",
    targetSales: 2390,
    actualSales: 3800,
  },
  {
    name: "July",
    targetSales: 3490,
    actualSales: 4300,
  },
  {
    name: "Aug",
    targetSales: 3490,
    actualSales: 4300,
  },
  {
    name: "Sep",
    targetSales: 3490,
    actualSales: 6300,
  },
  {
    name: "Oct",
    targetSales: 5490,
    actualSales: 2300,
  },
  {
    name: "Nov",
    targetSales: 5490,
    actualSales: 7300,
  },
  {
    name: "Dec",
    targetSales: 3490,
    actualSales: 4300,
  },
];

function ReBarChart({
  nameOne,
  nameTwo,
  strokeColor,
  data,
  dataKeyOne,
  dataKeyTwo,
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
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="" /> */}
        <XAxis dataKey="name" stroke={strokeColor} />
        <YAxis stroke={strokeColor} />
        <Tooltip />
        <Legend />
        <Bar
          barSize={20}
          radius={[4, 4, 0, 0]}
          name={nameOne}
          dataKey={dataKeyOne ? dataKeyOne : "actualSales"}
          fill="#FDB35F"
          activeBar={<Rectangle stroke="black" />}
        />
        <Bar
          barSize={20}
          radius={[4, 4, 0, 0]}
          name={nameTwo}
          dataKey={dataKeyTwo ? dataKeyTwo : "targetSales"}
          fill="#82ca9d"
          activeBar={<Rectangle stroke="black" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ReBarChart;
