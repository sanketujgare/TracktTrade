import Button from "../Button/Button.tsx";
import styles from "./Customer.module.scss";
import { CustomerProps } from "./Customer.types.ts";

const Customer = ({ data, handleCloseModal }: CustomerProps) => {
  return (
    <div className={styles.CustomerContainer}>
      <h3 className={styles.CustomerHeader}>Customer Details</h3>
      <div className={styles.CustomerDetails}>
        <p>Name: {data.customerName}</p>
        <p>Mobile Number: {data.customerMobileNumber}</p>
        <p>Email: {data.customerEmail}</p>
      </div>
      <div className={styles.CloseForm}>
        <Button
          buttonText="X"
          handleClick={handleCloseModal}
          buttonClass="modalButton"
        />
      </div>
    </div>
  );
};

export default Customer;
