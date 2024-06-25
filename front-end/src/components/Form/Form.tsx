// import { productSchema } from "../AddProductForm/AddProductForm.types.ts";
// import Button from "../Button/Button.tsx";
// import Input from "../Input/Input.tsx";
// import styles from "./Form.module.scss";
// import { FormProps, LoginInputType, productInputType } from "./Form.types.ts";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   useForm,
//   SubmitHandler,
//   FieldValues,
//   FieldError,
// } from "react-hook-form";

// const Form = ({ fields, submitData, SubmitButtontext }: FormProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // } = useForm();
//   } = useForm<productInputType>({
//     resolver: zodResolver(productSchema),
//   });
//   const onsubmit = (data: FieldValues) => {
//     submitData(data);
//   };
//   return (
//     <div className={styles.FormContainer}>
//       <form className={styles.Form} onSubmit={handleSubmit(onsubmit)}>
//         <div className={styles.InputList}>
//           {fields.map((field) => (
//             <div className={styles.InputContainer} key={field.name}>
//               <input
//                 placeholder={field.placeholder}
//                 className={styles.Input}
//                 {...register(field.name, field.validation)}
//                 type={field.type || "text"}
//               />

//               {errors[field.name] && (
//                 <p className={styles.Error}>
//                   {(errors[field.name] as FieldError).message}
//                 </p>
//               )}
//             </div>
//           ))}
//           <Button
//             buttonText={SubmitButtontext}
//             handleClick={onsubmit}
//             buttonClass={"primaryButton"}
//           />
//         </div>

//       </form>
//     </div>
//   );
// };

// export default Form;

import { useForm, FieldValues, FieldError } from "react-hook-form";
import Button from "../Button/Button.tsx";
import styles from "./Form.module.scss";
import { FormProps, LoginInputType, productInputType } from "./Form.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../AddProductForm/AddProductForm.types.ts";

const Form = ({ fields, submitData, SubmitButtontext }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: LoginInputType) => {
    submitData(data);
  };

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
          <Button buttonText={SubmitButtontext} buttonClass="primaryButton" />
        </div>
      </form>
    </div>
  );
};

export default Form;
