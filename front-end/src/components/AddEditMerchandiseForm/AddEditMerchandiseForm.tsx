import { useForm } from "react-hook-form";
import Button from "../Button/Button.tsx";
import styles from "./AddEditMerchandiseForm.module.scss";
import {
  AddEditMerchandiseFormProps,
  MerchandiseSchemaType,
  merchandiseSchema,
} from "./AddEditMerchandiseForm.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MerchandiseFormFields,
  MerchandiseType,
} from "../ManufacturerMerchandise/ManufacturerMerchandise.types.ts";
import {
  addMerchandise,
  editMerchandise,
  getMerchandiseData,
} from "../../services/Manufacturer.services.ts";

const AddEditMerchandiseForm = ({
  setModal,
  dispatch,
  currentMerchandise,
  merchandiseMode,
}: AddEditMerchandiseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MerchandiseSchemaType>({
    resolver: zodResolver(merchandiseSchema),
    defaultValues: currentMerchandise,
  });

  const handleMerchandise = async (data: MerchandiseType) => {
    try {
      if (merchandiseMode === "edit" && currentMerchandise) {
        await editMerchandise(currentMerchandise._id, data);
      } else if (merchandiseMode === "add") {
        await addMerchandise(data);
      }
      dispatch({ type: "RESET_FORM" });
      setModal(false);
      dispatch({
        type: "SET_MERCHANDISE_DATA",
        payload: { data: await getMerchandiseData() },
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const onSubmit = (data: MerchandiseType) => {
    handleMerchandise(data);
  };

  return (
    <div className={styles.FormContainer}>
      <div className={styles.FormHeader}>
        <h3 className={styles.FormHeading}>Add Products</h3>
      </div>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.InputList}>
          {MerchandiseFormFields.map((field) => (
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
            buttonText={merchandiseMode === "edit" ? "Update" : "Add"}
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

export default AddEditMerchandiseForm;
