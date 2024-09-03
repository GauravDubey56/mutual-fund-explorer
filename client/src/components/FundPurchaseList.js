import React from 'react';
import { List, Descriptions, Typography } from 'antd';

const { Title } = Typography;

const FundPurchaseList = ({ purchases }) => {
  console.log('Purchases:', purchases);
  return (
    <div>
      <Title level={4}>Fund Purchases</Title>
      <List
        bordered
        dataSource={purchases}
        renderItem={(purchase) => (
          <List.Item>
            <List.Item.Meta
              title={`Scheme Name: ${purchase.schema_name}`}
              description={`Purchase Type: ${purchase.purchase_type}`}
            />
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Units">{purchase.units.toString()}</Descriptions.Item>
              <Descriptions.Item label="Buy Price">₹{Number(purchase.buy_price).toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Total Amount">₹{Number(purchase.total_amount).toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="User ID">{purchase.user_id}</Descriptions.Item>
              <Descriptions.Item label="Purchase Date">{purchase.date.toLocaleString()}</Descriptions.Item>
              {purchase.purchase_type === 'SIP' && (
                <Descriptions.Item label="Monthly Payment Date">{purchase.monthly_payment_date}</Descriptions.Item>
              )}
            </Descriptions>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FundPurchaseList;
