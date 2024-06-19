import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./AddEditDistributorForm.module.scss";
import {
  AddEditDistributorFormProps,
  DistributorSchemaType,
  distributorFormSchema,
} from "./AddEditDistributorForm.types.ts";
import { useForm } from "react-hook-form";
import {
  DistributorFormFields,
  DistributorType,
} from "../DistributorList/DistributorList.types.ts";
import Button from "../Button/Button.tsx";

const AddEditDistributorForm = ({
  setModal,
  dispatch,
  currentDistributor,
  DistributorMode,
}: AddEditDistributorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DistributorSchemaType>({
    resolver: zodResolver(distributorFormSchema),
    defaultValues: currentDistributor,
  });

  const onSubmit = async (data: DistributorType) => {
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
      if (DistributorMode === "edit" && currentDistributor) {
        await editProdcuct(currentDistributor._id, data);
      } else if (DistributorMode === "add") {
        await addProdcuct(data);
      }
      dispatch({ type: "RESET_FORM" });
      setModal(false);
      dispatch({
        type: "SET_DISTRIBUTORS_DATA",
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
          {DistributorFormFields.map((field) => (
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
            buttonText={DistributorMode === "edit" ? "Update" : "Add"}
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

export default AddEditDistributorForm;
