import React from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip,} from "chart.js";
import {Doughnut} from "react-chartjs-2";

export default function DoughnutDiagram(labels, values, titleText = "", labelText = "", backgroundColors = ["rgba(53, 162, 235, 0.5)"], borderColors = [], borderWidth = 0, diagramWrapperClass = "") {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelText,
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderWidth,
      },
    ],
  };

  return (
    <div className={diagramWrapperClass}>
      <Doughnut options={options} data={data}/>
    </div>
  )
}