import AxiosInstance from "./Axios.Instance";

export const getDistributorInventoryData = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.get("inventory/getinventory");
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const orderDistributorInventory = async (updateData: {
  distributorId: string;
  products: {
    productId: string;
    quntity: number;
  }[];
}) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.post("order/placeorder", updateData);
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const sellInventory = async (salesData: any) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await AxiosInstance.post("sales/create-sales", salesData);
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getSpecificdistributorData = async () => {
  try {
    const { data } = await AxiosInstance.get(`user/profile`);
    console.log(data);
    //   console.log(response);
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getDistributorSalesData = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const response = await AxiosInstance.get(`sales/salesperproduct`, {
      params: {
        startdate: startDate.toISOString().split("T")[0],
        enddate: endDate.toISOString().split("T")[0],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch distributor sales data:", error);
    throw error;
  }
};
