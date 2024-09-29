import { Descriptions } from "antd";

const DescriptionContent = ({ fund }) => {
  return (
    <Descriptions column={1}>
      <Descriptions.Item label="Folio Number">
        {fund.folio_number}
      </Descriptions.Item>
      <Descriptions.Item label="Units Purchased">
        {fund.units_purchased}
      </Descriptions.Item>
      <Descriptions.Item label="Amount">{fund.amount}</Descriptions.Item>
    </Descriptions>
  );
};

export default DescriptionContent;