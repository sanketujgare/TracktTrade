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

export const sellInventory = async (salesData) => {
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
