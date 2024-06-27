import { Axios } from "axios";
import AxiosInstance from "./Axios.Instance";
import { productType } from "../components/Products/Products.types";
import { DistributorType } from "../components/DistributorList/DistributorList.types";

export const getProductsData = async (
  currentPage?: number,
  totalItems?: number
) => {
  try {
    currentPage = currentPage ? currentPage : 1;
    totalItems = totalItems ? totalItems : 10;
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get(
      `product/allproducts/${currentPage}/${totalItems}`
    );
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

export const getDistributorsData = async (
  currentPage: number,
  totalItems: number
) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get(
      `user/distributors/${currentPage}/${totalItems}`
    );
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteDistributor = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/user/delete/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const editDistributor = async (id: string, data: DistributorType) => {
  try {
    const response = await AxiosInstance.put(`/user/update/${id}`, data);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addDistributor = async (product: DistributorType) => {
  try {
    const { data } = await AxiosInstance.post("/user/create-user", product);
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

export const getDistributorRequestOrders = async (
  orderStatus: string,
  currentPage: number,
  totalItems: number
) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get(
      `order/allorder/${orderStatus}/${currentPage}/${totalItems}`
    );
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const approveDistributorRequest = async (id: String) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.put(`order/update/${id}`, {
      status: "completed",
    });
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

// ManfacturereMerchandise

export const getMerchandiseData = async (
  currentPage: number,
  totalItems: number
) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get(
      `merchandise/allmerchandise/${currentPage}/${totalItems}`
    );
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteMerchandise = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`merchandise/delete/${id}`);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const editMerchandise = async (id: string, data: productType) => {
  try {
    const response = await AxiosInstance.put(`merchandise/update/${id}`, data);
    console.log(response);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addMerchandise = async (product: productType) => {
  try {
    const { data } = await AxiosInstance.post(
      "merchandise/add-merchandise",
      product
    );
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const reedemMerchandise = async (reedemData) => {
  try {
    const { data } = await AxiosInstance.post("merchandise/redeem", reedemData);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getMerchandiseRequests = async (
  status: string,
  currentPage: number,
  totalItems: number
) => {
  try {
    const response = await AxiosInstance.get(
      `merchandise/request/${status}/${currentPage}/${totalItems}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch merchandise requests:", error);
    throw error;
  }
};

export const approveMerchandiseRequest = async (id: string) => {
  try {
    const response = await AxiosInstance.post(`merchandise/approve${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to approve merchandise request", error);
    throw error;
  }
};

// reports

export const getTopProductsReports = async (startDate: Date, endDate: Date) => {
  try {
    const response = await AxiosInstance.get(`sales/topselling`, {
      params: {
        startdate: startDate.toISOString().split("T")[0],
        enddate: endDate.toISOString().split("T")[0],
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch merchandise requests:", error);
    throw error;
  }
};
export const getTopPerformersReports = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const response = await AxiosInstance.get(`sales/topperformers`, {
      params: {
        startdate: startDate.toISOString().split("T")[0],
        enddate: endDate.toISOString().split("T")[0],
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch merchandise requests:", error);
    throw error;
  }
};
