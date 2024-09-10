/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Select, List, Button, Typography, Space, Descriptions, Modal } from "antd";
import { Link } from "react-router-dom";
import { getFundById, getFundsByFamily, getFundsByKeyword, getFundsCountByFamily, getFundsFamilyNames, PAGES_LISTING_LIMIT, purchaseFund } from "../api/funds";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import PurchaseModal from "./PurchaseModal"; // Import the new PurchaseModal
import CustomPagination from "./common/Pagination";
import CustomSearchBar from "./common/SearchBar";
const { Option } = Select;
const { Title } = Typography;

const Dashboard = () => {
  const [selectedFamily, setSelectedFamily] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedFamilyName, setSelectedFamilyName] = useState("");
  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [fundModal, setFundModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // search related fields

  const [searchValue, setSearchValue] = useState("");

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

      const respone = await purchaseFund(
        purchaseData
      );

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

  const getFamilyFundsOnSelect = async (amcCode) => {
    setLoading(true);
    const [fundsData, fundsCount] = await Promise.all([
      fetchFundsOnPageChange(),
      getFundsCountByFamily(amcCode),
    ]);
    if (fundsData.success && fundsData.data?.length) {
      setSchemes(fundsData.data);
    }
    if (fundsCount.success && fundsCount?.data?.count) {
      setTotalCount(fundsCount?.data?.count);

    }
    return fundsData;
  };
  const fetchFundsOnPageChange = async () => {
    setLoading(true);
    const fundGroup = JSON.parse(selectedFamily);
    const amcCode = fundGroup.amc_code;
    const fundsData = await getFundsByFamily(amcCode, currentPage);
    if (fundsData.success && fundsData.data?.length) {
      setSchemes(fundsData.data);
    }
    setLoading(false);
    return fundsData;
  };
  const fetchFundsOnSearch = async () => {  
    setLoading(true);
    const fundGroup = selectedFamily ? JSON.parse(selectedFamily) : null;
    const amcCode = fundGroup ? fundGroup.amc_code: null;
    const fundsData = await getFundsByKeyword(searchValue, amcCode);
    if (fundsData.success && fundsData.data?.length) {
      setSchemes(fundsData.data);
    }
    setLoading(false);
    return;
  };

  const viewFundsList = () => {
    return schemes?.length ? true : false;
  }
  const onClearHandler = () => {
    setSelectedFamily(null);
    setSchemes([]);
    setTotalCount(0);
  };
  const onSearchClearHandler = () => {
    setSearchValue("");
    setSchemes([]);
  };
  useEffect(() => {
    getFundsFamilyNames().then((response) => {
      if (response.success) {
        setGroups(response.data);
      }
    });
  }, []);
  useEffect(() => {
    if (totalCount) {
      setPagesCount(Math.ceil(totalCount / PAGES_LISTING_LIMIT.FUNDS));
    } else {
      setPagesCount(0);
    }
  }, [totalCount]);
  useEffect(() => {
    if (selectedFamily) {
      setLoading(true);
      const fundGroup = JSON.parse(selectedFamily);
      setSelectedFamilyName(fundGroup.fund_family_name);
      const amcCode = fundGroup.amc_code;
      getFamilyFundsOnSelect(amcCode).then((response) => {
  
        setLoading(false);
      });
    } else {
      setSchemes([]);
    }
  }, [selectedFamily]);
  useEffect(() => {
    if (selectedFamily) {
      fetchFundsOnPageChange();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    if (!searchValue) {
      setSchemes([]);
    }
  }, [searchValue]);
  return (
    <div>
      <Title level={2}>Mutual Funds Explorer</Title>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <Select
          style={{ width: 200, marginRight: 10 }}
          placeholder="Select Fund Family"
          onChange={setSelectedFamily}
          allowClear={true}
          onClear={onClearHandler}
        >
          {groups.map((group) => (
            <Option key={group.amc_code} value={JSON.stringify(group)}>
              {group.fund_family_name}
            </Option>
          ))}
        </Select>

        <CustomSearchBar
          style={{ width: 200, marginRight: 10 }}
          placeholder="Search Funds"
          onChange={(e) => {setSearchValue(e.target.value)}}
          onSubmit={(e) => {fetchFundsOnSearch()}}
          onClear={onSearchClearHandler}
        />
      </div>

      { viewFundsList() && (
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
                  <Link>{fund.scheme_name}</Link>
                }
                onClick={() => showFundModal(fund)}
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
      {pagesCount > 1 && (
        <CustomPagination
          total={totalCount}
          pageSize={PAGES_LISTING_LIMIT.FUNDS}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
