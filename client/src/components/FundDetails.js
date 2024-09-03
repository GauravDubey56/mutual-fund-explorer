import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Statistic, Row, Col } from 'antd';

const fundDetails = {
  1: { name: 'HDFC Top 100 Fund', type: 'Equity', nav: 100.50, aum: '1000 Cr' },
  2: { name: 'HDFC Mid-Cap Opportunities Fund', type: 'Equity', nav: 80.25, aum: '800 Cr' },
  3: { name: 'ICICI Prudential Bluechip Fund', type: 'Equity', nav: 90.75, aum: '950 Cr' },
  4: { name: 'ICICI Prudential Value Discovery Fund', type: 'Equity', nav: 85.60, aum: '750 Cr' },
  5: { name: 'SBI Blue Chip Fund', type: 'Equity', nav: 95.30, aum: '900 Cr' },
  6: { name: 'SBI Small Cap Fund', type: 'Equity', nav: 75.40, aum: '600 Cr' },
};

const FundDetails = () => {
  const { id } = useParams();
  const fund = fundDetails[id];

  if (!fund) {
    return <div>Fund not found</div>;
  }

  return (
    <Card
      title={fund.name}
      extra={<Button type="primary" onClick={() => alert(`Buying ${fund.name}`)}>Buy</Button>}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Type" value={fund.type} />
        </Col>
        <Col span={8}>
          <Statistic title="NAV" value={fund.nav} prefix="₹" precision={2} />
        </Col>
        <Col span={8}>
          <Statistic title="AUM" value={fund.aum} suffix="Cr" />
        </Col>
      </Row>
    </Card>
  );
};

export default FundDetails;