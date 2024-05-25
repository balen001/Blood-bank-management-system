import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//   ["month", "Bags Donated"],
//   ["2004", 1000],
//   ["2005", 1170],
//   ["2006", 660],
//   ["2007", 1030],
// ];

export default function CustomLineChart({ data, title }) {
  const options = {
    title: title,
    curveType: "function",
    legend: { position: "bottom" },
    vAxis: {viewWindowMode: "explicit", viewWindow: {min: 0}, minValue: 0},

  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}