import { useState } from "react";
import Button from "../Button/Button.tsx";
import styles from "./AddEditProductForm.module.scss";
import {
  addProdcuct,
  addProduct,
  editProdcuct,
  getProductsData,
} from "../../services/Manufacturer.services.ts";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductFormFields,
  Field,
  productType,
} from "../Products/Products.types.ts";
import {
  AddEditProductFormProps,
  ProductSchemaType,
  productSchema,
} from "./AddEditProductForm.types.ts";

const AddEditProductForm = ({
  setModal,
  dispatch,
  currentProduct,
  productMode,
}: AddEditProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: currentProduct,
  });

  const onSubmit = async (data: productType) => {
    // try {
    //   console.log(data);
    //   if (defaultValues) {
    //     const response = await editProdcuct(row._id);
    //   }
    //   const response = await addProdcuct(data);
    //   console.log(response);
    //   dispatch({ type: "SET_PRODUCTS_DATA", payload: { data: data } });
    //   setModal(false);
    // } catch (error: any) {
    //   console.error(error.message);
    // }
    try {
      if (productMode === "edit" && currentProduct) {
        await editProdcuct(currentProduct._id,data);
      } else if (productMode === "add") {
        await addProduct(data);
      }
      dispatch({ type: "RESET_FORM" });
      setModal(false);
      dispatch({
        type: "SET_PRODUCTS_DATA",
        payload: { data: await getProductsData() },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.FormContainer}>
      <div className={styles.FormHeader}>
        <h3 className={styles.FormHeading}>Add Products</h3>
      </div>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.InputList}>
          {ProductFormFields.map((field) => (
            <div className={styles.InputContainer} key={field.name}>
              <input
                placeholder={field.placeholder}
                className={styles.Input}
                {...register(field.name, field.validation)}
                type={field.type}
              />
              {errors[field.name] && (
                <p className={styles.Error}>
                  {(errors[field.name] as FieldError).message}
                </p>
              )}
            </div>
          ))}
          {/* <button type="submit" className={styles.primaryButton}></button> */}

          <Button
            buttonText={productMode === "edit" ? "Update" : "Add"}
            buttonClass="primaryButton"
          />
        </div>
      </form>
      <div className={styles.CloseForm}>
        <Button
          buttonText="X"
          handleClick={() => setModal(false)}
          buttonClass="modalButton"
        />
      </div>
    </div>
  );
};

export default AddEditProductForm;
