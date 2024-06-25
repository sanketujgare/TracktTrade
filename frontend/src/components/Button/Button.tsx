import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types.ts";

const Button = ({ buttonText, handleClick }: ButtonProps) => {
  return (
    <div className={styles.ButtonContainer}>
      <button className={styles.Button} onClick={() => handleClick()}>
        <span className={styles.ButtonText}>{buttonText}</span>
      </button>
    </div>
  );
};

export default Button;
