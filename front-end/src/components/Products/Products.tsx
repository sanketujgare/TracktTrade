import { useEffect, useReducer, useState } from "react";
import styles from "./Products.module.scss";
import {
  InitialState,
  InitialStateType,
  ProductsProps,
  productType,
} from "./Products.types.ts";
import {
  deleteProduct,
  getProductsData,
} from "../../services/Manufacturer.services.ts";
import Table from "../Table/Table.tsx";
import { columns } from "./Products.types.ts";
import Button from "../Button/Button.tsx";
import { ProductsReducer } from "./ProductsReducer.ts";
import AddEditProductForm from "../AddEditProductForm/AddEditProductForm.tsx";
import Dropdown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Modal from "../Modal/Modal.tsx";
import Pagination from "../Pagination/Pagination.tsx";

const Products = ({}: ProductsProps) => {
  const [state, dispatch] = useReducer(ProductsReducer, InitialState);

 
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
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await getProductsData();
      dispatch({ type: "SET_PRODUCTS_DATA", payload: { data } });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (state.currentProduct) {
        await deleteProduct(state.currentProduct._id);
        getProducts();
        dispatch({ type: "SET_DELETE_MODAL", payload: { deleteModal: false } });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEdit = (row: productType) => {
    console.log(row);
    dispatch({
      type: "SET_CURRENT_PRODUCT",
      payload: { currentProduct: row },
    });
    dispatch({
      type: "SET_MODAL",
      payload: { modal: true },
    });
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

  const handleDeleteModal = (row: productType) => {
    dispatch({
      type: "SET_CURRENT_PRODUCT",
      payload: { currentProduct: row },
    });
    dispatch({
      type: "SET_DELETE_MODAL",
      payload: { deleteModal: true },
    });
  };

  // const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch({
  //     type: "SET_SELECTED_CATEGORY",
  //     payload: { selectedCategory: event.target.value },
  //   });
  // };

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
    <div className={styles.ProductsContainer}>
      <div className={styles.AddButtonContainer}>
        <Button
          buttonText="+Add"
          handleClick={handleCloseModal}
          buttonClass={"primaryButton"}
        />
      </div>
      <div className={styles.SearchFeatures}>
        <Dropdown
          options={["All Products", "Category 1", "Category 2"]}
          selected={state.selectedCategory}
          handleSelect={handleSelect}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.ProductList}>
        <Table
          columns={columns}
          data={state.data}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      </div>
      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <AddEditProductForm
              setModal={handleCloseModal}
              dispatch={dispatch}
              currentProduct={state.currentProduct}
              productMode={state.productMode}
            />
          </div>
        </div>
      )}
      {state.deleteModal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <div className={styles.DeleteModal}>
              <span>Are You Sure</span>
              <Button
                buttonText="Delete"
                buttonClass="DeleteButton"
                handleClick={handleDelete}
              ></Button>
            </div>
            <div className={styles.CloseForm}>
              <Button
                buttonText="X"
                handleClick={handleDeleteModal}
                buttonClass="modalButton"
              />
            </div>
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

export default Products;
