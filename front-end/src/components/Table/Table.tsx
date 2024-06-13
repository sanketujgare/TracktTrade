import styles from "./Table.module.scss";
import { TableProps } from "./Table.types.ts";

const Table = ({ columns, data }: TableProps) => {
  return (
    <table className={styles.CustomTable}>
      <thead className={styles.THead}>
        <tr className={styles.TRow}>
          {columns.map((col, index) => (
            <th className={styles.THeader} key={index}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.TBody}>
        {data.map((row, rowIndex) => (
          <tr className={styles.TRow} key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td className={styles.TData} key={colIndex}>
                {col.header === "Image" ? (
                  <img
                    className={styles.Image}
                    src={row[col.accessor]}
                    alt=""
                  />
                ) : (
                  <span>{row[col.accessor]}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
