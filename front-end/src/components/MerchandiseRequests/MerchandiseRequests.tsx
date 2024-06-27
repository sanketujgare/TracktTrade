import { useEffect, useReducer, useState } from "react";
import DropDown from "../DropDown/DropDown.tsx";
import Table from "../Table/Table.tsx";
import styles from "./MerchandiseRequests.module.scss";
import {
  MerchandiseRequestsProps,
  initialRequestsState,
  RequestsDataType,
  MerchandiseRequestsColumns,
} from "./MerchandiseRequests.types.ts";
import {
  approveMerchandiseRequest,
  getMerchandiseRequests,
} from "../../services/Manufacturer.services.ts";
import { MerchandiseRequestsReducer } from "./MerchandiseRequests.reducer.ts";
import Button from "../Button/Button.tsx";
import Pagination from "../Pagination/Pagination.tsx";

const MerchandiseRequests = ({}: MerchandiseRequestsProps) => {
  const [state, dispatch] = useReducer(
    MerchandiseRequestsReducer,
    initialRequestsState
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
  const [requestStatus, setRequestStatus] = useState("pending");

  useEffect(() => {
    fetchRequests();
  }, [requestStatus, state.currentPage]);

  const fetchRequests = async () => {
    try {
      const data = await getMerchandiseRequests(
        requestStatus,
        state.currentPage,
        10
      );
      dispatch({
        type: "SET_REQUESTS_DATA",
        payload: { requestsData: data },
      });
    } catch (error) {
      console.error("Failed to fetch merchandise requests:", error);
    }
  };

  const handleApproveRequest = async (id: string) => {
    try {
      await approveMerchandiseRequest(id);

      fetchRequests();
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };

  const transformedData = state.requestsData.map((item) => ({
    requestId: item._id,
    // distributorName: item.distributorName,
    distributorName: item.username,
    merchandiseName: item.merchandiseName,
    requestDate: item.requestDate,
    status: item.status,
  }));

  const handleSelect = (option: string) => {
    setRequestStatus(option === "Pending Requests" ? "pending" : "completed");
  };

  return (
    <div className={styles.RequestsContainer}>
      <div className={styles.SearchFeatures}>
        <DropDown
          options={["Pending Requests", "Completed Requests"]}
          selected={
            requestStatus === "pending"
              ? "Pending Requests"
              : "Completed Requests"
          }
          handleSelect={handleSelect}
        />
      </div>
      <Table
        columns={MerchandiseRequestsColumns}
        data={transformedData}
        handleSelectItem={(item) => {
          dispatch({
            type: "SET_CURRENT_REQUEST",
            payload: { currentRequest: item },
          });
          dispatch({ type: "SET_MODAL", payload: { modal: true } });
        }}
      />

      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <div className={styles.Container}>
              <span>{state.currentRequest.distributorName}</span>
              <p>Merchandise: {state.currentRequest.merchandiseName}</p>
              <p>Date: {state.currentRequest.requestDate}</p>
              <Button
                buttonText={"Approve"}
                handleClick={() =>
                  handleApproveRequest(state.currentRequest.requestId)
                }
                buttonClass={"primaryButton"}
              />
            </div>
            <div className={styles.CloseForm}>
              <Button
                buttonText="X"
                handleClick={() =>
                  dispatch({ type: "SET_MODAL", payload: { modal: false } })
                }
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

export default MerchandiseRequests;
