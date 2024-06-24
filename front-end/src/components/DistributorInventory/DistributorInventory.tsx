import { useEffect, useReducer } from "react";
import styles from "./DistributorInventory.module.scss";
import { distributorInventoryReducer } from "./DistributorInventory.reducer.ts";
import {
  DistributorInventoryColumns,
  DistributorInventoryProps,
  DistributorInventoryType,
  InitialState,
  dummyData,
  flattenArrayOfObjects,
  flattenObj,
} from "./DistributorInventory.types.ts";
import {
  getDistributorInventoryData,
  orderDistributorInventory,
} from "../../services/Distributor.services.ts";
import Table from "../Table/Table.tsx";
import Button from "../Button/Button.tsx";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import DistributorOrderModal from "../DistributorOrderModal/DistributorOrderModal.tsx";
import { NewDistributorInventoryType } from "../DistributorOrderModal/DistributorOrderModal.types.ts";
import Pagination from "../Pagination/Pagination.tsx";

const DistributorInventory = ({}: DistributorInventoryProps) => {
  const [state, dispatch] = useReducer(
    distributorInventoryReducer,
    InitialState
  );

  const totalPages = 10;
  const itemsPerPage = 10;
  const indexOfLastItem = state.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: { currentPage: pageNumber },
    });
  };

  useEffect(() => {
    getDistributorInventory();
  }, []);

  const getDistributorInventory = async () => {
    try {
      const data = await getDistributorInventoryData();
      dispatch({
        type: "SET_INVENTORY_DATA",

        payload: { distributorInventoryData: data },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const transformedData = flattenArrayOfObjects(state.distributorInventoryData);

  const handleModal = () => {
    dispatch({
      type: "RESET_FORM",
    });
    dispatch({
      type: "SET_MODAL",
      payload: { modal: !state.modal },
    });
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
  const handleSelectItem = (item) => {
    let newSelectedItems = [];

    if (state.selectedItems.length > 0) {
      const existingItem = state.selectedItems.find(
        (inventoryItem) => inventoryItem._id === item._id
      );

      if (existingItem) {
        newSelectedItems = state.selectedItems.filter(
          (inventoryItem) => inventoryItem._id !== item._id
        );
      } else {
        newSelectedItems = [...state.selectedItems, item];
      }
    } else {
      newSelectedItems = [item];
    }

    console.log(newSelectedItems);

    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: newSelectedItems },
    });
  };

  const handleOrder = async () => {
    console.log("Order placed", state.selectedItems);
    // Handle the order logic here
    const products = state.selectedItems.map((product) => {
      return { productId: product._id, quantity: product.quantity };
    });

    const distributorId = localStorage.getItem("userId");
    console.log(distributorId);
    //  const { _id: productId, quantity } = selectedItem;
    const dataToUpdate = { distributorId, products };
    console.log(dataToUpdate);
    const data = await orderDistributorInventory(dataToUpdate);
    handleModal();
    console.log(data.message);

    if (data.message) {
      dispatch({
        type: "SET_SELECTED_ITEMS",
        payload: { selectedItems: [] },
      });
    }
  };

  const handleSelectedItemQuantity = (id: string, quantity: number) => {
    console.log(id, quantity);
    const updatedItems = state.selectedItems.map((item) =>
      item._id === id ? { ...item, quantity: quantity } : item
    );

    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: updatedItems },
    });
  };
  return (
    <div className={styles.ProductsContainer}>
      <div className={styles.AddButtonContainer}>
        <Button
          buttonText="Order"
          handleClick={handleOrder}
          buttonClass={"primaryButton"}
        />
      </div>
      <div className={styles.SearchFeatures}>
        <DropDown
          options={["All Products", "Category 1", "Category 2"]}
          selected={state.selectedCategory}
          handleSelect={handleSelect}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.ProductList}>
        <Table
          columns={DistributorInventoryColumns}
          data={transformedData}
          //   handleDelete={handleDeleteModal}
          //   handleEdit={handleEdit}
          handleSelectItem={handleSelectItem}
          selectedItems={state.selectedItems}
        />
      </div>
      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <DistributorOrderModal
              selectedItems={state.selectedItems}
              handleOrder={handleOrder}
              handleClose={handleModal}
              handleSelectedItemQuantity={handleSelectedItemQuantity}
            />
          </div>
        </div>
      )}

      <Pagination
        currentPage={state.currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default DistributorInventory;
