import React, { useState, useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function CategoryStatistics() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetch("/api/category-counts")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.map((item) => item.category);
        const counts = data.map((item) => item._count.category);
        setChartData({
          labels: categories,
          datasets: [
            {
              label: "Number of Comments",
              data: counts,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch((error) =>
        console.error("Error fetching category counts:", error),
      );
  }, []);

  return (
    <div>
      <a>Category Usage Statistics</a>
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Comment Categories",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default CategoryStatistics;
