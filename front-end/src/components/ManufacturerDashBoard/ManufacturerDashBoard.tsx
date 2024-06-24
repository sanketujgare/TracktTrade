import Products from "../Products/Products.tsx";
import styles from "./ManufacturerDashBoard.module.scss";
import { ManufacturerDashBoardProps } from "./ManufacturerDashBoard.types.ts";

const ManufacturerDashBoard = ({}: ManufacturerDashBoardProps) => {
  
  return (
    <div className={styles.DashBoard}>
      <Products />
    </div>
  );
};

export default ManufacturerDashBoard;
