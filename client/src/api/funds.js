import axios from "axios";
import { API_BASE_URL } from "../components/Constants";
import { getKeyFromLocalStorage } from "../components/LocalStore";
import { apiReponse } from "./utils";
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

export const getFundsByFamily = async (family) => {
  try {
    const url = `${API_BASE_URL}/funds/funds_list`;
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
      console.log(response?.data)
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
    console.log("Purchase payload:", payload, token);
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