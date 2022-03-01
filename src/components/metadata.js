import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect } from "react";

const baseChartOptions = {
  chart: {
    type: "column",
  },

  xAxis: {
    type: "category",
    labels: {
      rotation: 0,
      style: {
        fontSize: "18px",
        textOverflow: "none",
      },
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      colorByPoint: true,
    },
  },
  colors: ["darkred", "gray", "limegreen"],
};

const Metadata = ({ metadata }) => {
  const [chartOptions, setChartOptions] = React.useState({});
  useEffect(() => {
    const options = {
      ...baseChartOptions,
      title: {
        text: `Sentiment Score for: ${metadata?.label}`,
        style: {
          fontSize: "36px",
        },
      },
      subtitle: {
        text: `${metadata?.volume}`,
        style: {
          fontSize: "24px",
        },
      },
      series: {
        data: [
          ["Negative", metadata?.sentiment?.negative | 0],
          ["Neutral", metadata?.sentiment?.neutral | 0],
          ["Positive", metadata?.sentiment?.positive | 0],
        ],
        dataLabels: {
          enabled: true,
          color: "#00000",
          align: "right",
          style: {
            fontSize: "18px",
          },
        },
      },
    };
    setChartOptions(options);
  }, [metadata]);

  return (
    <div className="metadata-container">
      <HighchartsReact
      role="chart"
        className="chart"
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};

export default Metadata;
