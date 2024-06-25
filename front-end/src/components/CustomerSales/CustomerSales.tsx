import { useEffect, useReducer } from "react";
import styles from "./CustomerSales.module.scss";
import {
  CustomerSalesProps,
  SaleData,
  initialState,
} from "./CustomerSales.types";
import { useForm } from "react-hook-form";
import CustomerSalesReducer from "./CustomerSalesReducer";
import {
  getDistributorInventoryData,
  sellInventory,
} from "../../services/Distributor.services";
import { flattenArrayOfObjects } from "../DistributorInventory/DistributorInventory.types";
import Search from "../Search/Search";
import Button from "../Button/Button";

const CustomerSales = ({}: CustomerSalesProps) => {
  const [state, dispatch] = useReducer(CustomerSalesReducer, initialState);
  const { register, handleSubmit, reset } = useForm();

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

  const handleSell = async (saleData: SaleData) => {
    console.log("Sale Data: ", saleData);
    const userId = localStorage.getItem("userId");
    const transformedItems = saleData.items.map(
      ({ productName, ...rest }) => rest
    );
    const newSaleData = {
      distributorId: userId,
      ...saleData.customerdata,
      products: transformedItems,
    };
    // Make API call to sell items
    try {
      const response = await sellInventory(newSaleData);
      console.log(response.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSearch = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", query });

    const suggestions = transformedData.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    );

    dispatch({ type: "SET_SUGGESTIONS", suggestions });
  };

  const handleItemSelect = (item: { _id: string; productName: string }) => {
    const existingItem = state.selectedItems.find(
      (i) => i.productId === item._id
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE_ITEM_QUANTITY",
        productId: item._id,
        quantity: existingItem.quantity + 1,
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        item: {
          productId: item._id,
          productName: item.productName,
          quantity: 1,
          currentPrice: 0, // Initialize with 0 or any default value
        },
      });
    }

    dispatch({ type: "SET_SEARCH_QUERY", query: "" });
    dispatch({ type: "SET_SUGGESTIONS", suggestions: [] });
  };

  const handleRemoveItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  const onSubmit = (data: any) => {
    dispatch({
      type: "SET_CUSTOMER_DETAIL",
      field: "customerName",
      value: data.customerName,
    });
    dispatch({
      type: "SET_CUSTOMER_DETAIL",
      field: "customerMobileNumber",
      value: data.customerMobileNumber,
    });
    dispatch({
      type: "SET_CUSTOMER_DETAIL",
      field: "customerEmail",
      value: data.customerEmail,
    });

    const saleData: SaleData = {
      customerdata: {
        customerName: data.customerName,
        customerMobileNumber: data.customerMobileNumber,
        customerEmail: data.customerEmail,
      },
      items: state.selectedItems.map((item) => ({
        ...item,
        currentPrice: item.currentPrice, // Ensure currentPrice is included for each item
      })),
    };

    handleSell(saleData);
    dispatch({ type: "RESET_FORM" });
    reset();
  };

  return (
    <div className={styles.SalesFormContainer}>
      <h3>Sell Inventory</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.CustomerDetails}>
          <input
            type="text"
            {...register("customerName", { required: true })}
            placeholder="Customer Name"
            value={state.customerData.customerName}
            onChange={(e) =>
              dispatch({
                type: "SET_CUSTOMER_DETAIL",
                field: "customerName",
                value: e.target.value,
              })
            }
          />
          <input
            type="text"
            {...register("customerMobileNumber", { required: true })}
            placeholder="Customer Mobile Number"
            value={state.customerData.customerMobileNumber}
            onChange={(e) =>
              dispatch({
                type: "SET_CUSTOMER_DETAIL",
                field: "customerMobileNumber",
                value: e.target.value,
              })
            }
          />
          <input
            type="email"
            {...register("customerEmail", { required: true })}
            placeholder="Customer Email"
            value={state.customerData.customerEmail}
            onChange={(e) =>
              dispatch({
                type: "SET_CUSTOMER_DETAIL",
                field: "customerEmail",
                value: e.target.value,
              })
            }
          />
        </div>
        <div className={styles.ItemSelection}>
          <input
            type="text"
            value={state.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for an item..."
          />
          {state.suggestions.length > 0 && (
            <ul className={styles.Suggestions}>
              {state.suggestions.map((item) => (
                <li key={item._id} onClick={() => handleItemSelect(item)}>
                  {item.productName}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.SelectedItems}>
            {state.selectedItems.map((item) => (
              <div key={item.productId} className={styles.SelectedItem}>
                <span>{item.productName}</span>
                <label htmlFor="Quantity">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ITEM_QUANTITY",
                      productId: item.productId,
                      quantity: parseInt(e.target.value, 10),
                    })
                  }
                />
                <label htmlFor="CurrentPrice">Price</label>
                <input
                  type="number"
                  value={item.currentPrice}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ITEM_PRICE",
                      productId: item.productId,
                      currentPrice: parseInt(e.target.value, 10),
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <Button
          buttonText="Sell"
          handleClick={handleSubmit(onSubmit)}
          buttonClass="primaryButton"
        />
      </form>
    </div>
  );
};

export default CustomerSales;
