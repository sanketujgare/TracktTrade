import { FieldValues } from "react-hook-form";
import AxiosInstance from "./Axios.Instance";
import { jwtDecode } from "jwt-decode";
import { json } from "react-router-dom";
import { LoginInputType } from "../components/Form/Form.types";
export const loginRequst = async (data: LoginInputType) => {
  try {
    console.log(data);
    const response = await AxiosInstance.post("/auth/login", data);
    console.log(response);
    const role = response.data.role.toLowerCase();
    const token = response.data.token;
    const userId = response.data.userId;
    console.log(token);
    const user = { role: role };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", userId);
    // const role = "admin";
    const userrole = JSON.parse(localStorage.getItem("user") as string);

    return userrole.role;
  } catch (error: any) {
    console.log(JSON.stringify(error));
    throw new Error(error.message);
  }
};

export const logoutRequst = async () => {
  const response = await AxiosInstance.post("auth/logout", {});
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  console.log(response);
  localStorage.setItem("token", response.data.token);

  return response;
};
