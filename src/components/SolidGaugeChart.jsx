import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import SolidGauge from "highcharts/modules/solid-gauge";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsMore(Highcharts);
SolidGauge(Highcharts);

const SolidGaugeChart = ({ total_score = 67 }) => {
  const options = {
    chart: {
      type: "solidgauge",
      height: "100%",
    },

    title: null,

    tooltip: {
      enabled: false,
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          // Track for Move
          outerRadius: "112%",
          innerRadius: "90%",
          backgroundColor: Highcharts.color("#4a4e54").setOpacity(0.3).get(),
          borderWidth: 0,
        },
      ],
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        name: "Move",
        data: [
          {
            color: "#cc6ce8",
            radius: "112%",
            innerRadius: "90%",
            y: total_score,
          },
        ],
        dataLabels: {
          enabled: true,
          verticalAlign: "middle",
          format: "{y}",
          borderColor: "none",
          style: {
            fontSize: "4.5rem",
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SolidGaugeChart;
