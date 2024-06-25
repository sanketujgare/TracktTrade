// import { Form } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "../Form/Form.tsx";
import styles from "./Login.module.scss";
import { LoginProps } from "./Login.types.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { loginRequst } from "../../services/Authentication.services.ts";
import { useState } from "react";
import { LoginInputType } from "../Form/Form.types.ts";

const Login = ({}: LoginProps) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const formFields = [
    {
      name: "username",
      label: "Email",
      placeholder: "Email or Username",
      type: "text",
      validation: {
        required: "Email is required",
        pattern: {
          value:
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$|^[A-Za-z][A-Za-z0-9_]{3,16}$/,

          message: "Email is not valid",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];

  const handleFormSubmit = async (data: LoginInputType) => {
    try {
      const response = await loginRequst(data);
      console.log(response);
      navigate(response);
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Logo}>
        <span className={styles.FormHeader}>Login</span>
      </div>
      <div className={styles.LoginForm}>
        <Form
          fields={formFields}
          submitData={handleFormSubmit}
          SubmitButtontext="Login"
        />
      </div>
      {loginError && loginError}
    </div>
  );
};

export default Login;
