import axios from "axios";
import { API_BASE_URL } from "../components/Constants";
import { getKeyFromLocalStorage } from "../components/LocalStore";
import { apiReponse } from "./utils";

export const PAGES_LISTING_LIMIT = {
  FUNDS: 50,
  PURCHASES: 20
}
export const getFundsFamilyNames = async () => {
  try {
    const url = `${API_BASE_URL}/funds/fund_groups`;
    const token = getKeyFromLocalStorage("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token

      },
    });
    if (response.status === 200 && response?.data?.length) {
      return apiReponse(true, "Funds family names fetched", response.data, 200);
    } else {
      return apiReponse(false, "Funds family names not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};

export const getFundsByFamily = async (family, pageNumber) => {
  try {
    pageNumber = pageNumber || 1;
    const offset = (pageNumber - 1) * PAGES_LISTING_LIMIT.FUNDS;
    const url = `${API_BASE_URL}/funds/funds_list`;
    const token = getKeyFromLocalStorage("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
        fund_family: family,
        limit: PAGES_LISTING_LIMIT.FUNDS,
        offset
      }
    });
    if (response.status === 200 && response?.data?.length) {
      return apiReponse(true, "Funds fetched", response.data, 200);
    } else {
      return apiReponse(false, "Funds not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};


export const getFundById = async (id) => {
  try {
    const url = `${API_BASE_URL}/funds/fund_info`;
    const token = getKeyFromLocalStorage("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
        id
      }
    });
    if (response.status === 200 && response?.data) {
      return apiReponse(true, "Funds fetched", response.data, 200);
    } else {
      return apiReponse(false, "Funds not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};


export const purchaseFund = async (payload) => {
  try {
    const url = `${API_BASE_URL}/funds/purchase`;
    const token = getKeyFromLocalStorage("accessToken");
    const payloadWrap = {
      url,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        token,
      },
      data: payload,
    };
    const response = await axios.request(payloadWrap);
    if (response.status === 200 && response?.data?.status === "success") {
      return apiReponse(true, "Funds purchased", response.data, 200);
    } else {
      return apiReponse(false, response?.data?.message || "Funds not purchased", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
}

export const getPurchases = async () => {
  try {
    const url = `${API_BASE_URL}/funds/purchase_list`;
    const token = getKeyFromLocalStorage("accessToken");
    const payloadWrap = {
      url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        token,
      }
    };
    const response = await axios.request(payloadWrap);
    if (response.status === 200 && response?.data?.length) {
      return apiReponse(true, "Funds purchased fetched", response.data, 200);
    } else {
      return apiReponse(false, response?.data?.message || "Funds not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
}

export const getFundsCountByFamily = async (family) => {
  try {
    const url = `${API_BASE_URL}/funds/funds_count`;
    const token = getKeyFromLocalStorage("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
        fund_family: family
      }
    });
    if (response.status === 200 && !Number.isNaN(response?.data?.count) ) {
      return apiReponse(true, "Funds fetched", response.data, 200);
    } else {
      return apiReponse(false, "Funds not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};

export const getFundsByKeyword = async (keyword, family) => {
  try {
    const url = `${API_BASE_URL}/funds/search_funds`;
    const token = getKeyFromLocalStorage("accessToken");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token,
        fund_family: family ? family: null,
        search_string: keyword
      }
    });
    if (response.status === 200 && response?.data?.length) {
      return apiReponse(true, "Funds fetched", response.data, 200);
    } else {
      return apiReponse(false, "Funds not found", null, 404);
    }
  } catch (error) {
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};