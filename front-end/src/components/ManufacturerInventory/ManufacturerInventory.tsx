// import { useEffect, useReducer } from "react";
// import styles from "./ManufacturerInventory.module.scss";
// import {
//   InitialState,
//   ManufacturerInventoryColumns,
//   ManufacturerInventoryProps,
//   ManufacturerInventoryType,
//   flattenArrayOfObjects,
// } from "./ManufacturerInventory.types.ts";
// import { ManufacturerInventoryReducer } from "./ManufacturerInventory.reducer.ts";
// import {
//   getManufacturereInventoryData,
//   updateManufacturereInventoryData,
// } from "../../services/Manufacturer.services.ts";
// import Button from "../Button/Button.tsx";
// import DropDown from "../DropDown/DropDown.tsx";
// import Search from "../Search/Search.tsx";
// import Table from "../Table/Table.tsx";
// import Pagination from "../Pagination/Pagination.tsx";
// import ManufacturerInventoryUpdateModal from "../ManufacturerInventoryUpdateModal/ManufacturerInventoryUpdateModal.tsx";

// const ManufacturerInventory = ({}: ManufacturerInventoryProps) => {
//   const [state, dispatch] = useReducer(
//     ManufacturerInventoryReducer,
//     InitialState
//   );

//   const totalPages = 10;
//   const itemsPerPage = 10;
//   const indexOfLastItem = state.currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const handlePageChange = (pageNumber: number) => {
//     dispatch({
//       type: "SET_CURRENT_PAGE",
//       payload: { currentPage: pageNumber },
//     });
//   };

//   useEffect(() => {
//     getManufacturerInventory();
//   }, []);

//   const getManufacturerInventory = async () => {
//     try {
//       const data = await getManufacturereInventoryData();
//       //   console.log(data);
//       dispatch({
//         type: "SET_INVENTORY_DATA",
//         payload: { manufacturerInventoryData: data },
//         // payload: { manufacturerInventoryData: dummyData },
//       });
//     } catch (error: any) {
//       console.error(error.message);
//     }
//   };

//   const transformedData = flattenArrayOfObjects(
//     state.manufacturerInventoryData
//   );

//   console.log(transformedData);
//   const handleModal = () => {
//     dispatch({
//       type: "RESET_FORM",
//     });
//     dispatch({
//       type: "SET_MODAL",
//       payload: { modal: !state.modal },
//     });
//   };

//   const handleSelect = (option: string) => {
//     dispatch({
//       type: "SET_SELECTED_CATEGORY",
//       payload: { selectedCategory: option },
//     });
//   };

//   const handleSearch = (query: string) => {
//     dispatch({
//       type: "SET_SEARCH_QUERY",
//       payload: { searchQuery: query },
//     });
//   };
//   const handleSelectItem = (item) => {
//     let newSelectedItems = [];

//     if (state.selectedItems.length > 0) {
//       const existingItem = state.selectedItems.find(
//         (inventoryItem) => inventoryItem._id === item._id
//       );

//       if (existingItem) {
//         newSelectedItems = state.selectedItems.filter(
//           (inventoryItem) => inventoryItem._id !== item._id
//         );
//       } else {
//         newSelectedItems = [...state.selectedItems, item];
//       }
//     } else {
//       newSelectedItems = [item];
//     }

//     dispatch({
//       type: "SET_SELECTED_ITEMS",
//       payload: { selectedItems: newSelectedItems },
//     });
//   };

//   const handleOrder = () => {
//     console.log("Order placed", state.selectedItems);
//     // Handle the order logic here
//     handleModal();
//     dispatch({
//       type: "SET_SELECTED_ITEMS",
//       payload: { selectedItems: [] },
//     });
//   };

//   const handleEdit = (row: ManufacturerInventoryType) => {
//     handleSelectItem(row);
//     console.log(state.selectedItems);
//     // dispatch({ type: "SET_SELECTED_ITEMS", payload: { selectedItems: row } });
//     handleModal();
//     // updateManufacturerInventory();
//   };

//   const handleSelectedItemQuantity = (id: string, quantity: number) => {
//     console.log(id, quantity);
//     const updatedItems = state.selectedItems.map((item) =>
//       item._id === id ? { ...item, quantity: quantity } : item
//     );

//     dispatch({
//       type: "SET_SELECTED_ITEMS",
//       payload: { selectedItems: updatedItems },
//     });
//   };
//   return (
//     <div className={styles.ProductsContainer}>
//       <div className={styles.AddButtonContainer}>
//         <Button
//           buttonText="Order"
//           handleClick={handleModal}
//           buttonClass={"primaryButton"}
//         />
//       </div>
//       <div className={styles.SearchFeatures}>
//         <DropDown
//           options={["All Products", "Category 1", "Category 2"]}
//           selected={state.selectedCategory}
//           handleSelect={handleSelect}
//         />
//         <Search handleSearch={handleSearch} />
//       </div>
//       <div className={styles.ProductList}>
//         <Table
//           columns={ManufacturerInventoryColumns}
//           data={transformedData}
//           //   handleDelete={handleDeleteModal}
//           handleEdit={handleEdit}
//           //   handleSelectItem={handleSelectItem}
//           selectedItems={state.selectedItems}
//         />
//       </div>
//       {state.modal && (
//         <div className={styles.ModalView}>
//           <div className={styles.ModalContent}>
//             <ManufacturerInventoryUpdateModal
//               selectedItems={state.selectedItems}
//               handleOrder={handleOrder}
//               handleClose={handleModal}
//               handleSelectedItemQuantity={handleSelectedItemQuantity}
//             />

//             {/* <h3>Update Inventory Item</h3>
//             <span>{state.selectedItems.productName}</span>
//             <span>{state.selectedItems.quantity}</span> */}
//           </div>
//         </div>
//       )}

//       <Pagination
//         currentPage={state.currentPage}
//         totalPages={totalPages}
//         handlePageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default ManufacturerInventory;

import { useEffect, useReducer } from "react";
import styles from "./ManufacturerInventory.module.scss";
import {
  InitialState,
  ManufacturerInventoryColumns,
  ManufacturerInventoryProps,
  ManufacturerInventoryType,
  flattenArrayOfObjects,
} from "./ManufacturerInventory.types.ts";
import { ManufacturerInventoryReducer } from "./ManufacturerInventory.reducer.ts";
import {
  getManufacturereInventoryData,
  updateManufacturereInventoryData,
} from "../../services/Manufacturer.services.ts";
import Button from "../Button/Button.tsx";
import DropDown from "../DropDown/DropDown.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import ManufacturerInventoryUpdateModal from "../ManufacturerInventoryUpdateModal/ManufacturerInventoryUpdateModal.tsx";

const ManufacturerInventory = ({}: ManufacturerInventoryProps) => {
  const [state, dispatch] = useReducer(
    ManufacturerInventoryReducer,
    InitialState
  );

  useEffect(() => {
    getManufacturerInventory();
  }, []);

  const getManufacturerInventory = async () => {
    try {
      const data = await getManufacturereInventoryData();
      dispatch({
        type: "SET_INVENTORY_DATA",
        payload: { manufacturerInventoryData: data },
      });
      console.log(data.message);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const updateManufacturerInventory = async () => {
    try {
      const selectedItem = state.selectedItems[0];
      if (!selectedItem || !selectedItem._id) {
        console.error("Invalid item or _id is missing");
        console.log(selectedItem);
        return;
      }

      const { _id: productId, quantity } = selectedItem;
      const dataToUpdate = { productId, quantity };
      const data = await updateManufacturereInventoryData(dataToUpdate);
      getManufacturerInventory();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const transformedData = flattenArrayOfObjects(
    state.manufacturerInventoryData
  );

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

  const handleSelectItem = (item: ManufacturerInventoryType) => {
    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: [item] },
    });
  };

  const handleEdit = (row: ManufacturerInventoryType) => {
    handleSelectItem(row);
    handleModal();
  };

  const handleSelectedItemQuantity = (id: string, quantity: number) => {
    const updatedItems = state.selectedItems.map((item) =>
      item._id === id ? { ...item, quantity: quantity } : item
    );

    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: updatedItems },
    });
  };

  const handleOrder = () => {
    updateManufacturerInventory();
    handleModal();
    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: [] },
    });
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: { currentPage: pageNumber },
    });
  };

  const totalPages = Math.ceil(state.manufacturerInventoryData.length / 10);
  const currentData = transformedData.slice(
    (state.currentPage - 1) * 10,
    state.currentPage * 10
  );

  return (
    <div className={styles.ProductsContainer}>
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
          columns={ManufacturerInventoryColumns}
          data={currentData}
          handleEdit={handleEdit}
          selectedItems={state.selectedItems}
        />
      </div>
      {state.modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <ManufacturerInventoryUpdateModal
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

export default ManufacturerInventory;
