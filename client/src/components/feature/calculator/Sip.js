import React, { useState } from "react";
import { Form, Input, Row, Col, Typography } from "antd";

// Component for SIP calculation inputs and results
const SipContent = () => {
  const { Text } = Typography;
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [timePeriod, setTimePeriod] = useState(0);

  const totalMonths = timePeriod * 12;
  const investedAmount = monthlyInvestment * totalMonths;
  const returnAmount = (monthlyInvestment * totalMonths * rateOfReturn) / 100;
  const totalReturns = investedAmount + returnAmount;

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Monthly Investment">
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="Enter monthly investment"
            />
          </Form.Item>
          <Form.Item label="Expected Rate of Return (%)">
            <Input
              type="number"
              value={rateOfReturn}
              onChange={(e) => setRateOfReturn(e.target.value)}
              placeholder="Enter rate of return"
            />
          </Form.Item>
          <Form.Item label="Time Period (years)">
            <Input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="Enter time period"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Total Invested Amount">
            <Text strong>{`₹ ${investedAmount}`}</Text>
          </Form.Item>
          <Form.Item label="Return Amount">
            <Text strong>{`₹ ${returnAmount}`}</Text>
          </Form.Item>
          <Form.Item label="Total Returns">
            <Text strong>{`₹ ${totalReturns}`}</Text>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SipContent;
