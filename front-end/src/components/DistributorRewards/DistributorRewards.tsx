import { useEffect, useReducer, useState } from "react";
import styles from "./DistributorRewards.module.scss";
import {
  DistributorRewardsProps,
  InitialState,
  MerchandiseType,
  Rewardscolumns,
} from "./DistributorRewards.types.ts";
import { RewardsReducer } from "./DistributorRewards.reducer.ts";
import {
  deleteMerchandise,
  getMerchandiseData,
  reedemMerchandise,
} from "../../services/Manufacturer.services.ts";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import Button from "../Button/Button.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import { getSpecificdistributorData } from "../../services/Distributor.services.ts";
import { distributorInfoType } from "../DistributorHome/DistributorHome.types.ts";

const DistributorRewards = ({}: DistributorRewardsProps) => {
  const [state, dispatch] = useReducer(RewardsReducer, InitialState);
  const [distributorData, setDistributorData] = useState<distributorInfoType>(
    {}
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
    getMerchandise();
  }, [state.currentPage]);

  const getMerchandise = async () => {
    try {
      const data = await getMerchandiseData(state.currentPage, 10);
      dispatch({ type: "SET_MERCHANDISE_DATA", payload: { data } });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getspecificDistributor();
  }, []);

  const getspecificDistributor = async () => {
    try {
      // const distributorID = localStorage.getItem("userId");
      const data = await getSpecificdistributorData();

      setDistributorData(data);
    } catch (error: any) {
      console.log(error.message);
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

  const handleCloseReedemModal = () => {
    dispatch({
      type: "SET_MODAL",
      payload: { modal: false },
    });
  };

  const handleSelect = (option: string) => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: { selectedCategory: option },
    });
  };

  const handleReedem = (row: MerchandiseType) => {
    dispatch({
      type: "SET_CURRENT_MERCHANDISE",
      payload: { currentMerchandise: row },
    });

    dispatch({
      type: "SET_MODAL",
      payload: { modal: true },
    });
    console.log(state.modal);
    // handleDelete();
  };
  const handleReedemMerchandise = () => {
    try {
      const distributorId = localStorage.getItem("userId");
      const data = {
        userId: distributorId,
        merchandiseId: state.currentMerchandise._id,
      };
      const response = reedemMerchandise(data);
      console.log(response.message);
    } catch (error: any) {
      console.log(error.message);
    }
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
    <div className={styles.DistributorRewardsContainer}>
      <div className={styles.PointsContainer}>
        <span>{distributorData.totalPoints}</span>
      </div>
      <div className={styles.SearchFeatures}>
        <DropDown
          options={["Merchandise"]}
          selected={state.selectedCategory}
          handleSelect={handleSelect}
        />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.ProductList}>
        <Table
          columns={Rewardscolumns}
          data={state.merchandiseData}
          //   handleDelete={handleDeleteModal}
          //   handleEdit={handleEdit}
          handleSelectItem={handleReedem}
        />
      </div>

      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <div className={styles.ReedemModal}>
              <p className={styles.ReedemModalHeader}>Are you sure</p>
              <div className={styles.MerchandiseInfo}>
                <div className={styles.MerchandiseImage}>
                  <img
                    className={styles.Image}
                    src={state.currentMerchandise.merchandiseImage}
                    alt=""
                  />
                </div>
                <div className={styles.MerchandiseContent}>
                  <span> Merchandise</span>
                  <p>{state.currentMerchandise.merchandiseName}</p>
                </div>

                <div className={styles.MerchandiseContent}>
                  <span> Points</span>
                  <p>{state.currentMerchandise.pointsRequired}</p>
                </div>
              </div>
              <Button
                buttonText="Confirm"
                buttonClass="primaryButton"
                handleClick={handleReedemMerchandise}
              ></Button>
            </div>
            <div className={styles.CloseForm}>
              <Button
                buttonText="X"
                handleClick={handleCloseReedemModal}
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

export default DistributorRewards;
