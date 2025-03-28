import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title, xLabel, yLabel }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const Dashboard = () => {
  const vendorsData = {
    labels: ["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4", "Vendor 5", "Vendor 6", "Vendor 7", "Vendor 8"],
    datasets: [
      {
        label: "Sales",
        data: [10, 15, 13, 9, 18, 14, 11, 16],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const itemsData = {
    labels: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"],
    datasets: [
      {
        label: "Sales",
        data: [9, 18, 12, 10, 17, 15, 10, 14],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="w-full md:w-3/4 mx-auto">
        <BarChart data={vendorsData} title="Vendor Sales" xLabel="Vendors" yLabel="Sales" />
      </div>
      <div className="w-full md:w-3/4 mx-auto">
        <BarChart data={itemsData} title="Item Sales" xLabel="Items" yLabel="Sales" />
      </div>
    </div>
  );
};

export default Dashboard;
