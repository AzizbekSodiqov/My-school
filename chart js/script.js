const chartData = {
  labels: ["Phyton", "Java", "Javascript", "C#", "Others"],
  data: [30, 17, 10, 7, 36],
};

const myChart = document.querySelectorAll(".my-chart");

new Chart(myChart, {
  type: "doughnut",
  data: {
    labels: chartData.labels,
    datasets: [
      {
        label: "Tilni biluvchilar",
        data: chartData.data,
      },
    ],
  },
  options: {
    borderWidth: 5,
    borderRadius: 2,
    hoverBorderWidth: 0,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
