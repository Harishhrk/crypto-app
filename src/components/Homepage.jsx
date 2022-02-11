import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic, Alert} from 'antd';
import {Link} from 'react-router-dom';
import {Cryptocurrencies, News} from '../components';
import { useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

const {Title} = Typography; //Destructing Typography here to use it as Title only 

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(20);
  const globalsStats = data?.data?.stats;
  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };
  
  if(isFetching) return <Loader />;

  return (
    <>
    <Alert
      message=""
      description="Some of Sections are not Working due to limited Api Endpoints and its functionality"
      type="error"
      closable
      onClose={onClose}
    />
    <Title level={2} className="heading">Crypto Market Statistic</Title>
    <Row>
      <Col span={12}><Statistic title="Total Cryptocurrencies"  value={globalsStats.total}/></Col>
      <Col span={12}><Statistic title="Market Cap"  value={millify(globalsStats.totalMarketCap)}/>USD</Col>
      <Col span={12}><Statistic title="24h Volume $"  value={millify(globalsStats.total24hVolume)}/>USD</Col>
      <Col span={12}><Statistic title="Total Exchanges"  value={millify(globalsStats.totalExchanges)}/></Col>
      <Col span={12}><Statistic title="Total Markets"  value={millify(globalsStats.totalMarkets)}/></Col>
    </Row>
    <div className="home-heading-container">
      <Title level={2} className="home-title">Today's Cryptocurrency Prices by Market Cap</Title>
      <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      
    </div>
    <Alert
      message=""
      description="If you not able to get all Crypto coins, Please avail Search bar from Cryptocurrencies Section. We regret any inconvenience caused by the Api Service"
      type="info"
      closable
      onClose={onClose}
    />
    <Cryptocurrencies simplified/>
    <div className="home-heading-container">
      <Title level={2} className="home-title">Latest News</Title>
      
    </div>
    <News simplified/>
    <div className="home-heading-container">
    <Title level={3}className="show-more"><Link to="/news">Show More</Link></Title>
    </div>
    </>
  )
};

export default Homepage;
