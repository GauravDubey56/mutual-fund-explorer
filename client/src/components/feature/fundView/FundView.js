import { Card } from "antd";
import { useState } from "react";
import FundDetails from "./Details";
import Calculator from "../calculator/Calculator";

const TAB_KEYS = {
    INFO: "1",
    CALCULATOR: "2",
};


const FundView = ({selectedFund}) => {
    const [activeTabKey, setActiveTabKey] = useState(TAB_KEYS.INFO);
    const onTabChange = (key) => {
        setActiveTabKey(key);
    };

    const tabsList = [
        {
            key: TAB_KEYS.INFO,
            label: "Info",
        },
        {
            key: TAB_KEYS.CALCULATOR,
            label: "Calculator",
        },
    ];

    const contentList = {
      [TAB_KEYS.INFO]: <FundDetails selectedFund={selectedFund} />,
      [TAB_KEYS.CALCULATOR]: <Calculator returnRate={17.3} disableRateInput={true} />,
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

export default FundView;
