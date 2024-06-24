import { useEffect, useReducer } from "react";
import styles from "./DistributorList.module.scss";
import {
  DistributorListProps,
  DistributorType,
  InitialStateType,
  columns,
  distributors,
} from "./DistributorList.types.ts";
import { DistributorsReducer } from "./Distributors.reducer.ts";
import Button from "../Button/Button.tsx";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import AddEditDistributorForm from "../AddEditDistributorForm/AddEditDistributorForm.tsx";
import { deleteDistributor, getDistributorsData } from "../../services/Manufacturer.services.ts";

export const InitialState: InitialStateType = {
  data: [],
  modal: false,
  currentDistributor: {},
  distributorMode: "add",
  selectedCategory: "All Products",
  searchQuery: "",
  deleteModal: false,
};

const DistributorList = ({}: DistributorListProps) => {
  const [state, dispatch] = useReducer(DistributorsReducer, InitialState);

  useEffect(() => {
    getDistributors();
  }, []);

  const getDistributors = async () => {
    try {
      const data = await getDistributorsData();
      dispatch({ type: "SET_DISTRIBUTORS_DATA", payload: { data } });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (state.currentDistributor) {
        await deleteDistributor(state.currentDistributor._id);
        getDistributors();
        dispatch({
          type: "SET_DELETE_MODAL",
          payload: { deleteModal: false },
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleEdit = (row: DistributorType) => {
    console.log(row);
    dispatch({
      type: "SET_CURRENT_DISTRIBUTOR",
      payload: { currentDistributor: row },
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

  const handleDeleteModal = (row: DistributorType) => {
    dispatch({
      type: "SET_CURRENT_DISTRIBUTOR",
      payload: { currentDistributor: row },
    });
    dispatch({
      type: "SET_DELETE_MODAL",
      payload: { deleteModal: !state.deleteModal },
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
    <div className={styles.DistributorsContainer}>
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
          columns={columns}
            data={state.data}
          // data={distributors}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      </div>
      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <AddEditDistributorForm
              setModal={handleCloseModal}
              dispatch={dispatch}
              currentDistributor={state.currentDistributor}
              DistributorMode={state.distributorMode}
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
    </div>
  );
};

export default DistributorList;
