import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types.ts";

const Button = ({ buttonText, handleClick, buttonClass }: ButtonProps) => {
  return (
    <div className={styles.ButtonContainer}>
      <button
        className={`${styles[buttonClass]}`}
        onClick={handleClick}
        type="submit"
      >
        <span className={styles.ButtonText}>{buttonText}</span>
      </button>
    </div>
  );
};

export default Button;
