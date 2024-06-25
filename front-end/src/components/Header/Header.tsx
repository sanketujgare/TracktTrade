import styles from "./Header.module.scss";
import { HeaderProps } from "./Header.types.ts";

const Header = ({}: HeaderProps) => {
  return (
    <div className={styles.Header}>
      <h3 className={styles.HeaderText}>Hello User</h3>
    </div>
  );
};

export default Header;
