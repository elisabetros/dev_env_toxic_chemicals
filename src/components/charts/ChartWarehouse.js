import React, { useEffect, useState, useRef } from "react";
import Chartjs from "chart.js";

const ChartWarehouse = (props) => {
  const [chartState, setChartState] = useState(props);

  console.log('props', Object.keys(props.chemicalInventory));
  // console.log(chartState);

  const warehouse = props.id;
  // console.log(warehouse);
  const letters = Object.keys(props.chemicalInventory);
  const values = Object.values(props.chemicalInventory);


  console.log(letters, values);

  const chartConfig = {
    type: "bar",
    data: {
      labels: letters,
      datasets: [
        {
          label: `Warehouse# ${warehouse}`,
          data: values,
          backgroundColor: [
           '#47b39c',
            '#FFc154',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  // console.log("start create chart");
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // console.log(chartContainer);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartWarehouse;
