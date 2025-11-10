Chart.register(ChartDataLabels);

const faqs = document.querySelectorAll(".faq .item");

faqs.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// const chartData = {
//   labels: [16.5, 10.6, 14, 9.2, 17.5, 18.3, 13.9],
//   data: [16.5, 10.6, 14, 9.2, 17.5, 18.3, 13.9],
// };

// const myChart = document.querySelectorAll(".my-chart");

// new Chart(myChart, {
//   type: "doughnut",
//   data: {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: "",
//         data: chartData.data,
//       },
//     ],
//   },
//   options: {
//     borderWidth: 5,
//     borderRadius: 2,
//     hoverBorderWidth: 0,
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   },
// });

// again
const ctx = document.querySelector(".my-chart");
const percent = [16.5, 10.6, 14, 9.2, 17.5, 18.3, 13.9];
const count = [165, 106, 140, 92, 175, 183, 139];

const data = {
  labels: [
    "1-sinf",
    "2-sinf",
    "3-sinf",
    "4-sinf",
    "5-sinf",
    "6-sinf",
    "7-sinf",
  ],
  datasets: [
    {
      data: percent,
      backgroundColor: [
        "#b6f2a6",
        "#9debb2",
        "#a6f0d0",
        "#b5f2e1",
        "#20c997",
        "#4ce3bb",
        "#87e6c9",
      ],
      borderColor: "#fff",
      borderWidth: 4,
      cutout: "40%", // 30% markaz
    },
  ],
};

let center = { label: "", percent: "", count: "" };

// Markazdagi yozuvlar — biroz pastda chiqadi (vizual markaz!)
const centerPlugin = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data.length) return;

    const arc = meta.data[0];
    const centerX = arc.x;
    const centerY = arc.y + 0; // 10px pastga — vizual markaz uchun

    if (center.label) {
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.font = "bold 10px Arial";
      ctx.fillStyle = "#383838";
      ctx.fillText(center.label, centerX, centerY - 26);

      ctx.font = "bold 12px Arial";
      ctx.fillStyle = "#383838";
      ctx.fillText(center.percent, centerX, centerY - 2);

      ctx.restore();
    }
  },
};

new Chart(ctx, {
  type: "doughnut",
  data,
  options: {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        color: "#008b66",
        font: { weight: "bold", size: 14 },
        formatter: (v) => v + "%",
      },
    },
    onHover: (e, a) => {
      if (a.length) {
        const i = a[0].index;
        center = {
          label: data.labels[i],
          percent: percent[i] + "%",
          count: count[i],
        };
      } else center = { label: "", percent: "", count: "" };
      e.chart.update();
    },
  },
  plugins: [ChartDataLabels, centerPlugin],
});

const modal = document.getElementById("modal");
const openLink = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

// <a> bosilganda sahifa yangilanmasin
openLink.addEventListener("click", (e) => {
  e.preventDefault(); // sahifani qayta yuklashni to‘xtatadi
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
