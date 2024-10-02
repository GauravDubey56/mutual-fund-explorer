import { Card } from "antd";
import { useState } from "react";
import LumpSumContent from "./LumpSum";
import SipContent from "./Sip";

const TAB_KEYS = {
    LUMP_SUM: "1",
    SIP: "2",
};

// Main Calculator Component
const Calculator = ({ returnRate, disableRateInput }) => {
    const props = { returnRate, disableRateInput };
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
      [TAB_KEYS.LUMP_SUM]: <LumpSumContent {...props} />,
      [TAB_KEYS.SIP]: <SipContent {...props} />,
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
