import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { AddProductFormFields, ProductsProps } from "./Products.types.ts";
import { getProductsData } from "../../services/Manufacturer.services.ts";
import Table from "../Table/Table.tsx";
import { columns } from "./Products.types.ts";
import Button from "../Button/Button.tsx";
import Form from "../Form/Form.tsx";
import AddProductForm from "../AddProductForm/AddProductForm.tsx";
import { FieldValues } from "react-hook-form";
import Modal from "../Modal/Modal.tsx";
import { Link } from "react-router-dom";

const Products = ({}: ProductsProps) => {
  const [data, setdata] = useState([]);
  const [modal, setModal] = useState(false);

  const getProducts = async () => {
    const { data } = await getProductsData();
    console.log(data);
    setdata(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  //   const handleFormSubmit = async (data: FieldValues) => {
  //     try {
  //       const response = await addProduct(data);
  //       console.log(response);
  //     } catch (error: any) {
  //       //   setLoginError(error.message);
  //     }
  //   };

  return (
    <div className={styles.ProductsContainer}>
      {/* <Link to={"/manufacturer/addcustomer"}> */}
      <div className={styles.AddButtonContainer}>
        <Button buttonText="+Add" handleClick={() => setModal(true)} />
        {/* </Link> */}
      </div>
      <div className={styles.ProductList}>
        <Table columns={columns} data={data} />
      </div>
      {modal && (
        <div className={styles.ModalView}>
          <div className={styles.ModalContent}>
            <AddProductForm setModal={setModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
