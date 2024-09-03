import axios from "axios";
import { API_BASE_URL } from "../components/Constants";
import { setKeyInLocalStorage } from "../components/LocalStore";
import { apiReponse } from "./utils";
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
      username,
      password,
    });
    const accessToken = response.data?.access_token;
    if (accessToken) {
      setKeyInLocalStorage("accessToken", accessToken);
      return apiReponse(true, "Login successful", null, 200);
    } else {
      return apiReponse(false, "Login failed", null, 401);
    }
  } catch (error) {
    console.error("error in login: ", error.response);
    return apiReponse(
      false,
      error.response?.data?.message || "Something went wrong",
      null,
      error.response?.status || 500
    );
  }
};
