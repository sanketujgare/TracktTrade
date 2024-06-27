import { useEffect, useReducer, useState } from "react";
import DropDown from "../DropDown/DropDown.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import styles from "./ManufacturerOrders.module.scss";
import {
  ManufacturerOrdersProps,
  initialOrdersState,
  OrderDataType,
  ManufacturerOrdersColumns,
  DistributorOrderDataType,
  transformDataType,
  productColumns,
} from "./ManufacturerOrders.types.ts";
import {
  approveDistributorRequest,
  getDistributorRequestOrders,
  getDistributorsData,
  getProductsData,
} from "../../services/Manufacturer.services.ts";
import { ManufacturerOrdersReducer } from "./ManufacturerOrders.reducer.ts";
import Button from "../Button/Button.tsx";

const ManufacturerOrders = ({}: ManufacturerOrdersProps) => {
  const [state, dispatch] = useReducer(
    ManufacturerOrdersReducer,
    initialOrdersState
  );

  const [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    getDistributors();
    getProducts();
  }, []);

  useEffect(() => {
    getDistributorOrders();
  }, [orderStatus, state.selectedCategory, state.currentPage]); // Fetch orders whenever the selected category or order status changes

  useEffect(() => {
    if (
      state.ordersData.length > 0 &&
      state.distributorData.length > 0 &&
      state.productsData.length > 0
    ) {
      maketransFormedData();
    }
  }, [state.ordersData, state.productsData, state.distributorData]);

  const getDistributorOrders = async () => {
    try {
      const data = await getDistributorRequestOrders(
        orderStatus,
        state.currentPage,
        10
      );
      dispatch({
        type: "SET_MANUFACTURERORDERS_DATA",
        payload: { ordersData: data },
      });
    } catch (error) {
      console.error("Failed to fetch distributor orders:", error);
    }
  };

  const getDistributors = async () => {
    try {
      const data = await getDistributorsData(state.currentPage, 10);
      dispatch({
        type: "SET_DISTRIBUTORS_DATA",
        payload: { distributorData: data },
      });
    } catch (error) {
      console.error("Failed to fetch distributor data:", error);
    }
  };

  const getProducts = async () => {
    try {
      const data = await getProductsData(state.currentPage, 10);
      dispatch({
        type: "SET_PRODUCTS_DATA",
        payload: { productsData: data },
      });
    } catch (error) {
      console.error("Failed to fetch products data:", error);
    }
  };

  const maketransFormedData = () => {
    const transFormedData = state.ordersData.map((item) => ({
      orderId: item._id,
      distributorId: item.distributorId,
      name: getDistributor(item.distributorId),
      status: item.status,
      products: item.products.map((product) => ({
        ...product,
        ...getProduct(product.productId),
      })),
    }));

    dispatch({
      type: "SET_TRANSFORMED_DATA",
      payload: { transFormedData },
    });
  };

  const getDistributor = (distributorId: string) => {
    const distributor = state.distributorData.find(
      (dist) => dist._id === distributorId
    );
    return distributor ? distributor.name : "Unknown Distributor";
  };

  const getProduct = (_id: string) => {
    const product = state.productsData.find((prod) => prod._id === _id);
    return product
      ? {
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.productImage,
          productDescription: product.productDescription,
        }
      : { productName: "Unknown Product" };
  };

  const handleSelect = (option: string) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: option },
    });
    setOrderStatus(option === "Pending Orders" ? "pending" : "completed");
  };

  const handleSearch = (query: string) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: { searchQuery: query },
    });
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: { currentPage: pageNumber },
    });
  };

  const totalPages = 10;
  const itemsPerPage = 10;
  const indexOfLastItem = state.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const filteredData = state.ordersData.filter((order) =>
  //   order.products.some((product) =>
  //     product.productId?.toLowerCase().includes(state.searchQuery.toLowerCase())
  //   )
  // );

  // const totalPages = Math.ceil(
  //   state.transFormedData ? state.transFormedData.length  10 : 0
  // );
  // const currentData = filteredData.slice(
  //   (state.currentPage - 1) * 10,
  //   state.currentPage * 10
  // );

  const handleCurrentOrder = (item: DistributorOrderDataType) => {
    dispatch({ type: "SET_CURRENT_ORDER", payload: { currentOrder: item } });
    dispatch({ type: "SET_MODAL", payload: { modal: true } });
  };

  const handleApproveReqest = async (id: string) => {
    try {
      const response = await approveDistributorRequest(id);
      // Optionally, refresh orders after approving a request
      getDistributorOrders();
      dispatch({ type: "SET_MODAL", payload: { modal: false } });
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_MODAL", payload: { modal: false } });
  };

  return (
    <div className={styles.OrdersContainer}>
      <div className={styles.SearchFeatures}>
        <DropDown
          options={["Pending Orders", "Completed Orders"]}
          selected={state.selectedCategory}
          handleSelect={handleSelect}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.OrderList}>
        <Table
          columns={ManufacturerOrdersColumns}
          data={state.transFormedData}
          handleSelectItem={handleCurrentOrder}
        />
      </div>
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <div className={styles.Container}>
              <span>{state.currentOrder.name}</span>
              <Table
                data={state.currentOrder.products}
                columns={productColumns}
              />
              {orderStatus === "pending" ? (
                <Button
                  buttonText={"Approve"}
                  handleClick={() =>
                    handleApproveReqest(state.currentOrder.orderId)
                  }
                  buttonClass={"primaryButton"}
                />
              ) : null}
            </div>

            <div className={styles.CloseForm}>
              <Button
                buttonText="X"
                handleClick={handleCloseModal}
                buttonClass="modalButton"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerOrders;
