import { useEffect, useReducer } from "react";
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
} from "./ManufacturerOrders.types.ts";
import {
  getDistributorRequestOrders,
  getDistributorsData,
  getProductsData,
} from "../../services/Manufacturer.services.ts";
import { ManufacturerOrdersReducer } from "./ManufacturerOrders.reducer.ts";

const ManufacturerOrders = ({}: ManufacturerOrdersProps) => {
  const [state, dispatch] = useReducer(
    ManufacturerOrdersReducer,
    initialOrdersState
  );

  useEffect(() => {
    getDistributorOrders();
    getDistributors();
    getProducts();
  }, []); // Add dependency array to avoid infinite loop

  const getDistributorOrders = async () => {
    try {
      const data = await getDistributorRequestOrders();
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
      const data = await getDistributorsData();
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
      const data = await getProductsData();
      dispatch({
        type: "SET_DISTRIBUTORS_DATA",
        payload: { distributorData: data },
      });
    } catch (error) {
      console.error("Failed to fetch distributor data:", error);
    }
  };

  const handleSelect = (option: string) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: option },
    });
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

  const filteredData = state.ordersData.filter((order) =>
    order.products.some((product) =>
      product.productid?.toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / 10);
  const currentData = filteredData.slice(
    (state.currentPage - 1) * 10,
    state.currentPage * 10
  );

  const getDistributor = (distributorId: string) => {
    const distributor = state.distributorData.find(
      (dist) => dist._id === distributorId
    );
    // console.log(distributor);
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

  if (
    state.productsData.length > 0 &&
    state.distributorData.length > 0 &&
    state.ordersData.length > 0
  ) {
    const data = state.ordersData.map((item) => {
      return {
        name: getDistributor(item.distributorId),
        status: item.status,
        products: item.products.map((product) => ({
          ...product,
          ...getProduct(product._id),
        })),
      };
    });
  } else {
    const data = [];
  }

  const handleCurrentOrder = (item: DistributorOrderDataType) => {
    dispatch({ type: "SET_CURRENT_ORDER", payload: { currentOrder: item } });
    dispatch({ type: "SET_MODAL", payload: { modal: !state.modal } });
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
      <div className={styles.ProductList}>
        <Table
          columns={ManufacturerOrdersColumns} // Adjust columns as needed
          data={data as DistributorOrderDataType}
          handleSelectItem={handleCurrentOrder}
        />
      </div>
      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {state.modal && <div>{data}</div>}
    </div>
  );
};

export default ManufacturerOrders;
