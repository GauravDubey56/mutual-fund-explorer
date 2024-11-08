/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Select, List, Button, Typography, Space, Modal } from "antd";
import { Link } from "react-router-dom";
import { getFundById, getFundsByFamily, getFundsByKeyword, getFundsCountByFamily, getFundsFamilyNames, PAGES_LISTING_LIMIT, purchaseFund } from "../api/funds";
import { ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import PurchaseModal from "./PurchaseModal"; // Import the new PurchaseModal
import CustomPagination from "./common/Pagination";
import CustomSearchBar from "./common/SearchBar";
import DescriptionContent from "./common/DescriptionContent";
import PageTitle from "./utils/PageTitle";
import FundView from "./feature/fundView/FundView";

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
  const [showList, setShowList] = useState(false);
  const [currentSearch, setCurrentSearch] = useState("");
  // search related fields
  useEffect(() => {
    if (!schemes?.length) {
      setTotalCount(0);
      setShowList(false);
    } else {
      setShowList(true);
    }
  }, [schemes])
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
            <DescriptionContent fund={data} />
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
    setCurrentSearch(searchValue);
    if (fundsData.success && fundsData.data?.length) {
      setSchemes(fundsData.data);
    }
    setLoading(false);
    return;
  };

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
      setSelectedFamilyName("");
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
      setShowList(false);
      setCurrentSearch("");
    }
  }, [searchValue]);
  return (
    <div>
      <PageTitle title="Dashboard" />
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
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onSubmit={(e) => {
            fetchFundsOnSearch();
          }}
          onClear={onSearchClearHandler}
        />
      </div>

      {showList && (
        <List
          header={
            <Title level={4}>
              {selectedFamilyName
                ? `${selectedFamilyName}- FUNDS`
                : `Search results for "${currentSearch}"`}
            </Title>
          }
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
                title={<Link>{fund.scheme_name}</Link>}
                onClick={() => showFundModal(fund)}
                description={fund.scheme_type}
              />
            </List.Item>
          )}
        />
      )}
      {schemes.length === 0 && currentSearch && (
        <Title level={4}>No results found for "{currentSearch}"</Title>
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
        {selectedFund && <FundView selectedFund={selectedFund} />}
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
