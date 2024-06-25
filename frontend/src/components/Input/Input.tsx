import styles from "./Input.module.scss";
import { InputProps } from "./Input.types.ts";

const Input = ({ type, placehodlerText = "enter username" }: InputProps) => {
  return (
    <div className={styles.InputContainer}>
      <input
        className={styles.Input}
        type={type}
        placeholder={placehodlerText}
      />
    </div>
  );
};

export default Input;
