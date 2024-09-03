import React, { useState, useEffect } from "react";
import { Select, List, Button, Typography, Space, Descriptions, Modal } from "antd";
import { Link } from "react-router-dom";
import { getFundById, getFundsByFamily, getFundsFamilyNames, purchaseFund } from "../api/funds";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import PurchaseModal from "./PurchaseModal"; // Import the new PurchaseModal

const { Option } = Select;
const { Title } = Typography;

const Dashboard = () => {
  const [selectedFamily, setSelectedFamily] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [selectedFamilyName, setSelectedFamilyName] = useState("");
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundModal, setFundModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = async (fund) => {
    const response = await getFundById(fund.unique_no);
    setSelectedFund(response.data);
    setModalVisible(true);
  };

  const showFundModal = async (fund) => {
    const response = await getFundById(fund.unique_no);
    setSelectedFund(response.data);
    setFundModal(true);
  };
  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleFundModalClose = () => {
    setFundModal(false);
  };

  const handlePurchaseSubmit = async (purchaseData) => {
    try {
      console.log("Purchase data:", purchaseData);
      const respone = await purchaseFund(
        purchaseData
      );
      console.log("Purchase response:", respone);
      if (respone.success) {
        const data = respone.data;
        Modal.success({
          title: "Purchase Successful",
          content: (
            <Descriptions column={1}>
              <Descriptions.Item label="Folio Number">
                {data.folio_number}
              </Descriptions.Item>
              <Descriptions.Item label="Units Purchased">
                {data.units_purchased}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {data.amount}
              </Descriptions.Item>
            </Descriptions>
          ),
        });
        handleModalClose();
      } else {
        Modal.error({
          title: "Purchase Failed",
          content: respone.message,
        });
      }
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  useEffect(() => {
    getFundsFamilyNames().then((response) => {
      if (response.success) {
        setGroups(response.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedFamily) {
      setLoading(true);
      const fundGroup = JSON.parse(selectedFamily);
      setSelectedFamilyName(fundGroup.fund_family_name);
      const amcCode = fundGroup.amc_code;
      getFundsByFamily(amcCode).then((response) => {
        if (response.success && response.data?.length) {
          setSchemes(response.data);
          setLoading(false);
        }
      });
    } else {
      setSchemes([]);
    }
  }, [selectedFamily]);

  return (
    <div>
      <Title level={2}>Mutual Funds Explorer</Title>
      <Select
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select Fund Family"
        onChange={setSelectedFamily}
      >
        {groups.map((group) => (
          <Option key={group.amc_code} value={JSON.stringify(group)}>
            {group.fund_family_name}
          </Option>
        ))}
      </Select>
      {selectedFamily && (
        <List
          header={<Title level={4}>{selectedFamilyName} Mutual Funds</Title>}
          bordered
          loading={loading}
          dataSource={schemes}
          renderItem={(fund) => (
            <List.Item
              actions={[
                <Space>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => showModal(fund)}
                  >
                    Buy
                  </Button>
                  <Button
                    icon={<InfoCircleOutlined />}
                    onClick={() => showFundModal(fund)}
                  >
                    Info
                  </Button>
                </Space>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/fund/${fund.unique_no}`}>{fund.scheme_name}</Link>
                }
                description={fund.scheme_type}
              />
            </List.Item>
          )}
        />
      )}
      <PurchaseModal
        visible={modalVisible}
        onClose={handleModalClose}
        fund={selectedFund}
        onSubmit={handlePurchaseSubmit}
      />
      <Modal
        title="Fund Details"
        open={fundModal}
        onCancel={handleFundModalClose}
        footer={null}
      >
        {selectedFund && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Fund Name">{selectedFund.scheme_name}</Descriptions.Item>
            <Descriptions.Item label="Scheme Code">{selectedFund.scheme_code}</Descriptions.Item>
            <Descriptions.Item label="Type">{selectedFund.scheme_type}</Descriptions.Item>
            <Descriptions.Item label="Scheme Plan">{selectedFund.scheme_plan}</Descriptions.Item>
            <Descriptions.Item label="NAV">₹{selectedFund.minimum_purchase_amount}</Descriptions.Item>  
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
