import { useEffect, useReducer } from "react";
import Button from "../Button/Button.tsx";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import styles from "./ManufacturerCustomers.module.scss";
import {
  CustomerType,
  Customercolumns,
  InitialState,
  ManufacturerCustomersProps,
  customerData,
} from "./ManufacturerCustomers.types.ts";
import { ManufacturerCustomersReducer } from "./ManufacturerCustomers.reducer.ts";
import { geManufacturertCustomersData } from "../../services/Manufacturer.services.ts";
import Customer from "../Customer/Customer.tsx";

const ManufacturerCustomers = ({}: ManufacturerCustomersProps) => {
  const [state, dispatch] = useReducer(
    ManufacturerCustomersReducer,
    InitialState
  );

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const data = await geManufacturertCustomersData();
      dispatch({
        type: "SET_MANUFACTURERCUSTOMERS_DATA",
        payload: { customerdata: data },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    dispatch({
      type: "RESET_FORM",
    });
    dispatch({
      type: "SET_MODAL",
      payload: { modal: !state.modal },
    });
  };

  const handleView = (item: CustomerType) => {
    console.log("clicked");
    dispatch({
      type: "SET_CURRENT_MANUFACTURERCUSTOMER",
      payload: { currentManufacturer: item },
    });
    dispatch({
      type: "SET_MODAL",
      payload: { modal: true },
    });
  };

  const handleSelect = (option: string) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: option },
    });
  };

  // const filteredData =
  //   state.selectedCategory === "All Products"
  //     ? state.data
  //     : state.data.filter(
  //         (product) => product.category === state.selectedCategory
  //       );

  const handleSearch = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: { searchQuery: query } });
  };

  return (
    <div className={styles.ManufacturerContainer}>
      {/* <div className={styles.AddButtonContainer}>
        <Button
          buttonText="+Add"
          handleClick={handleCloseModal}
          buttonClass={"primaryButton"}
        />
      </div> */}
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
          columns={Customercolumns}
          //   data={state.customerdata}
          data={customerData}
          // data={distributors}
          //   handleDelete={handleDeleteModal}
          // handleEdit={handleEdit}
          handleSelectItem={handleView}
        />
      </div>

      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <Customer
              data={state.currentManufacturer}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerCustomers;
