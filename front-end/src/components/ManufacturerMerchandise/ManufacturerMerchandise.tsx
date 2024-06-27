import { useEffect, useReducer } from "react";
import styles from "./ManufacturerMerchandise.module.scss";
import { merchandiseReducer } from "./ManufacturerMerchandise.reducer.ts";
import {
  InitialState,
  ManufacturerMerchandiseProps,
  MerchandiseType,
  Merchandisecolumns,
} from "./ManufacturerMerchandise.types.ts";
import {
  deleteMerchandise,
  getMerchandiseData,
} from "../../services/Manufacturer.services.ts";
import Button from "../Button/Button.tsx";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import AddEditMerchandiseForm from "../AddEditMerchandiseForm/AddEditMerchandiseForm.tsx";

const ManufacturerMerchandise = ({}: ManufacturerMerchandiseProps) => {
  const [state, dispatch] = useReducer(merchandiseReducer, InitialState);

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
    getMerchandise();
  }, []);

  const getMerchandise = async () => {
    try {
      const data = await getMerchandiseData(state.currentPage,10);
      dispatch({ type: "SET_MERCHANDISE_DATA", payload: { data } });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (state.currentMerchandise) {
        await deleteMerchandise(state.currentMerchandise._id);
        getMerchandise();
        dispatch({
          type: "SET_DELETE_MODAL",
          payload: { deleteModal: false },
        });
        console.log(state.deleteModal);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEdit = (row: MerchandiseType) => {
    console.log(row);
    dispatch({
      type: "SET_CURRENT_MERCHANDISE",
      payload: { currentMerchandise: row },
    });

    dispatch({
      type: "SET_MODAL",
      payload: { modal: true },
    });
    console.log(state.modal);
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

  const handleDeleteModal = (row: MerchandiseType) => {
    dispatch({
      type: "SET_CURRENT_MERCHANDISE",
      payload: { currentMerchandise: row },
    });

    dispatch({
      type: "SET_DELETE_MODAL",
      payload: { deleteModal: true },
    });
    console.log(state.deleteModal);
    // handleDelete();
  };

  const handleCloseDeleteModal = () => {
    dispatch({
      type: "SET_DELETE_MODAL",
      payload: { deleteModal: false },
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
    <div className={styles.MerchandiseContainer}>
      <div className={styles.AddButtonContainer}>
        <Button
          buttonText="+Add"
          handleClick={handleCloseModal}
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
          columns={Merchandisecolumns}
          data={state.merchandiseData}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      </div>
      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <AddEditMerchandiseForm
              setModal={handleCloseModal}
              dispatch={dispatch}
              currentMerchandise={state.currentMerchandise}
              merchandiseMode={state.merchandiseMode}
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
                handleClick={handleCloseDeleteModal}
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

export default ManufacturerMerchandise;
