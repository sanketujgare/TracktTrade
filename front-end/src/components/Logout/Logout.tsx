import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.scss";
import { LogoutProps } from "./Logout.types.ts";
import { useEffect } from "react";
import { logoutRequst } from "../../services/Authentication.services.ts";

const Logout = ({}: LogoutProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    logoutRequst();
    navigate("/");
  }, []);

  return <>logout</>;
};

export default Logout;
