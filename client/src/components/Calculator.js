import { Card, Input, Form, Row, Col, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

const TAB_KEYS = {
    LUMP_SUM: "1",
    SIP: "2",
};

// Component for Lump Sum calculation inputs and results
const LumpSumContent = () => {
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [rateOfReturn, setRateOfReturn] = useState(0);
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

// Component for SIP calculation inputs and results
const SipContent = () => {
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

// Main Calculator Component
const Calculator = () => {
    const [activeTabKey, setActiveTabKey] = useState(TAB_KEYS.LUMP_SUM);
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    const tabsList = [
        {
            key: TAB_KEYS.LUMP_SUM,
            label: "Lump Sum",
        },
        {
            key: TAB_KEYS.SIP,
            label: "SIP",
        },
    ];

    const contentList = {
        [TAB_KEYS.LUMP_SUM]: <LumpSumContent />,
        [TAB_KEYS.SIP]: <SipContent />,
    };

    return (
        <Card
            style={{ width: '100%' }}
            tabList={tabsList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
        >
            {contentList[activeTabKey]}
        </Card>
    );
};

export default Calculator;
