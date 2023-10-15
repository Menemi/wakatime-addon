import React from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {Bar} from "react-chartjs-2";

export default function BarDiagram(labels, values, titleText = "", labelText = "", backgroundColors = ["rgba(53, 162, 235, 0.5)"], borderColors = [], borderWidth = 0, diagramWrapperClass = "") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: titleText,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: labelText,
        data: values,
        backgroundColor: backgroundColors,
        borderWidth: borderWidth,
        borderColor: borderColors
      }
    ],
  };

  return (
    <div className={diagramWrapperClass}>
      <Bar options={options} data={data}/>
    </div>
  )
}