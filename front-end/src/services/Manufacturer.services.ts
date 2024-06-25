import { Axios } from "axios";
import AxiosInstance from "./Axios.Instance";
import { productType } from "../components/Products/Products.types";
import { DistributorType } from "../components/DistributorList/DistributorList.types";

export const getProductsData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("product/allproducts");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/product/delete/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const editProdcuct = async (id: string, data: productType) => {
  try {
    const response = await AxiosInstance.put(`/product/update/${id}`, data);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addProduct = async (product: productType) => {
  try {
    const { data } = await AxiosInstance.post("/product/add-product", product);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getDistributorsData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("users/distributors");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteDistributor = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/users/delete/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const editDistributor = async (id: string, data: DistributorType) => {
  try {
    const response = await AxiosInstance.put(`/users/update/${id}`, data);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addDistributor = async (product: DistributorType) => {
  try {
    const { data } = await AxiosInstance.post("/users/create-user", product);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getManufacturereInventoryData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("inventory/getinventory/");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateManufacturereInventoryData = async (updatedata: {
  productId: string;
  quantity: number;
}) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.put("inventory/update/", updatedata);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const geManufacturertCustomersData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("customer/allcustomers");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getDistributorRequestOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("order/allorder/pending");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
