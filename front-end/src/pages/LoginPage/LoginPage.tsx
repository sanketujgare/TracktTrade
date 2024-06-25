import Login from "../../components/Login/Login.tsx";
import styles from "./LoginPage.module.scss";
import { LoginPageProps } from "./LoginPage.types.ts";

const LoginPage = ({}: LoginPageProps) => {
  return (
    <div className={styles.LoginPage}>
      <div className={styles.LoginContainer}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
