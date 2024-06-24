import DropDown from "../DropDown/DropDown.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Search from "../Search/Search.tsx";
import Table from "../Table/Table.tsx";
import styles from "./ManufacturerOrders.module.scss";
import { ManufacturerOrdersProps } from "./ManufacturerOrders.types.ts";

const ManufacturerOrders = ({}: ManufacturerOrdersProps) => {
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

  const handleSelectItem = (item) => {
    dispatch({
      type: "SET_SELECTED_ITEMS",
      payload: { selectedItems: [item] },
    });
  };

  const handleEdit = (row) => {
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

export default ManufacturerOrders;
