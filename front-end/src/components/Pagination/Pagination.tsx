import styles from "./Pagination.module.scss";
import { PaginationProps } from "./Pagination.types.ts";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,

}: PaginationProps) => {
  const onPageChange = (newPage: number) => {
    console.log("clicked", newPage);

    if (newPage > 0 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
    
  };
  console.log(currentPage);
  return (
    <div className={styles.Pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.PageButton}
      >
        {"<"}
      </button>
      <span className={styles.PageInfo}>
        {currentPage} - {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.PageButton}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
