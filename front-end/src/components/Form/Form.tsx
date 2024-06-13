import Button from "../Button/Button.tsx";
import Input from "../Input/Input.tsx";
import styles from "./Form.module.scss";
import { FormProps, LoginInputType } from "./Form.types.ts";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldError,
} from "react-hook-form";

const Form = ({ fields, onSubmit, SubmitButtontext }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className={styles.FormContainer}>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.InputList}>
          {fields.map((field) => (
            <div className={styles.InputContainer} key={field.name}>
              <input
                placeholder={field.placeholder}
                className={styles.Input}
                {...register(field.name, field.validation)}
                type={field.type || "text"}
              />

              {errors[field.name] && (
                <p className={styles.Error}>
                  {(errors[field.name] as FieldError).message}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* <button className={styles[SubmitButtontext]} type="submit">
          {SubmitButtontext}
        </button> */}
        <Button buttonText={SubmitButtontext} handleClick={() => {}} />
      </form>
    </div>
  );
};

export default Form;
