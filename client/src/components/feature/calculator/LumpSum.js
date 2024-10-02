// Component for Lump Sum calculation inputs and results
import React, { useState } from "react";
import { Form, Input, Row, Col, Typography } from "antd";

const LumpSumContent = (props) => {
  const { returnRate, disableRateInput } = props || {};

  const { Text } = Typography;
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(returnRate || 0);
  const [timePeriod, setTimePeriod] = useState(0);

  const investedAmount = totalInvestment;
  const returnAmount = (totalInvestment * rateOfReturn * timePeriod) / 100;
  const totalReturns = investedAmount + returnAmount;

  return (
    <Form layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Total Investment">
            <Input
              type="number"
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(e.target.value)}
              placeholder="Enter total investment"
            />
          </Form.Item>
          <Form.Item label="Expected Rate of Return (%)">
            <Input
              type="number"
              value={rateOfReturn}
              disabled={disableRateInput}
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

export default LumpSumContent;
