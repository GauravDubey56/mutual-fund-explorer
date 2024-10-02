import React from "react";
import { Descriptions } from "antd";

const FundDetails = ({ selectedFund }) => {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Fund Name">
        {selectedFund.scheme_name}
      </Descriptions.Item>
      <Descriptions.Item label="Scheme Code">
        {selectedFund.scheme_code}
      </Descriptions.Item>
      <Descriptions.Item label="Type">
        {selectedFund.scheme_type}
      </Descriptions.Item>
      <Descriptions.Item label="Scheme Plan">
        {selectedFund.scheme_plan}
      </Descriptions.Item>
      <Descriptions.Item label="NAV">
        ₹{selectedFund.minimum_purchase_amount}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default FundDetails;
