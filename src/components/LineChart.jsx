import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {Chart as ChartJS} from 'chart.js/auto'
const {Title} = Typography;


const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
    coinPrice.push(coinHistory.data.history[i].price);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        
          ticks: {
            beginAtZero: true,
          },
        },
    },
  };
  if(!coinName) return "Loading...";
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-Title">
          {coinName} Price Chart
        </Title>
        <Col className="chart-container">
          <Title level={5} className="chart-Title">
            Change in last 24h {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="chart-Title">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;