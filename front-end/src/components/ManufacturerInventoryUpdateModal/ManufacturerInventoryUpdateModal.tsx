import { useRef, useState } from "react";
import Button from "../Button/Button.tsx";
import styles from "./ManufacturerInventoryUpdateModal.module.scss";
import { ManufacturerInventoryUpdateModalProps } from "./ManufacturerInventoryUpdate.types.ts";

const ManufacturerInventoryUpdateModal = ({
  selectedItems,
  handleOrder,
  handleClose,
  handleSelectedItemQuantity,
}: ManufacturerInventoryUpdateModalProps) => {
  const handleConfirmOrder = () => {
    handleOrder(selectedItems);
  };
  return (
    <div className={styles.Modal}>
      <div className={styles.ModalContent}>
        <h2>Order Items</h2>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>
                  <input
                    className={styles.Input}
                    type="number"
                    min="1"
                    value={item.quantity}
                    // onChange={(e) =>
                    //   handleQuantityChange(item._id, Number(e.target.value))
                    // }
                    onChange={(e) =>
                      handleSelectedItemQuantity(
                        item._id,
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.ButtonContainer}>
          <Button
            buttonText="Confirm"
            handleClick={handleConfirmOrder}
            buttonClass={"primaryButton"}
          />
          <Button
            buttonText="Cancel"
            handleClick={handleClose}
            buttonClass={"CancelButton"}
          />
        </div>
      </div>
    </div>
  );
};

export default ManufacturerInventoryUpdateModal;
