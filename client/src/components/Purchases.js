import React, { useEffect, useState } from 'react';
import FundPurchaseList from './FundPurchaseList';
import { getPurchases } from '../api/funds';


const FundPurchasePage = () => {
  const [purchases, setPurchases] = useState([]);

  const fetchAndSetPurchases = async () => {
    const purchases = await getPurchases();
    if (purchases.success && purchases?.data?.length) setPurchases(purchases.data);

  };
  useEffect(() => {
    fetchAndSetPurchases();
  }, []);
  return (
    <div>
      <FundPurchaseList purchases={purchases} />
    </div>
  );
};

export default FundPurchasePage;
