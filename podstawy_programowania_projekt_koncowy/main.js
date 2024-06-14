const fileReader = new FileReader();

function fromCsv() {
  let fromCsvContainer = document.getElementById("fromCsvContainer");
  let fromSquareFunctionContainer = document.getElementById(
    "fromSquareFunctionContainer"
  );
  fromCsvContainer.style.display = "block";
  fromSquareFunctionContainer.style.display = "none";
}

// function fromSquareFunction() {
//   let fromCsvContainer = document.getElementById("fromCsvContainer");
//   let fromSquareFunctionContainer = document.getElementById(
//     "fromSquareFunctionContainer"
//   );
//   fromCsvContainer.style.display = "none";
//   fromSquareFunctionContainer.style.display = "block";
// }

function readCsv(file) {
  invalidFileErrorText = document.getElementById("invalidInputFile");
  if (file.type !== "text/csv") {
    invalidFileErrorText.style.display = "block";
    return;
  } else {
    invalidFileErrorText.style.display = "none";
  }
  fileReader.onload = drawGraph;
  fileReader.readAsText(file);
}
function drawGraph() {
  if (fileReader.result) {
    const data = fileReader.result.replace(/[^\S\r\n]/g, "").split(/\r\n/);
    const axisTitles = data[0].split(",").filter((elem) => elem);
    const xAxisTitle = axisTitles[0];
    const yAxisTitle = axisTitles[1];
    const xValues = [];
    const yValues = [];
    for (let i = 1; i < data.length - 1; i++) {
      row = data[i].split(",");
      xValues.push(row[0]);
      yValues.push(row[1]);
    }
    const chartData = {
      labels: xValues,
      datasets: [
        {
          data: yValues,
        },
      ],
    };
    const chartConfig = {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: xAxisTitle,
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisTitle,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
    const chart = new Chart("chart", chartConfig);
  }
}
