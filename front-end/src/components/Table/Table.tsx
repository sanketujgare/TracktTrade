import Button from "../Button/Button.tsx";
import { DistributorInventoryType } from "../DistributorInventory/DistributorInventory.types.ts";
import styles from "./Table.module.scss";
import { TableProps } from "./Table.types.ts";

const Table = ({
  columns,
  data,
  handleDelete,
  handleEdit,
  handleSelectItem,
  selectedItems,
}: TableProps) => {
  // const getNestedValue = (obj: any, path: string) => {
  //   return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  // };
  return (
    <div className={styles.TableContainer}>
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
          {data &&
            data.map((row, rowIndex) => (
              <tr className={styles.TRow} key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td className={styles.TData} key={colIndex}>
                    {col.header === "Image" ? (
                      <img
                        className={styles.Image}
                        src={row[col.accessor as keyof typeof row]}
                        alt=""
                      />
                    ) : col.header === "Select" ? (
                      <input
                        type="checkbox"
                        className={styles.Checkbox}
                        onChange={() => handleSelectItem(row)}
                        checked={selectedItems.some(
                          (selectedItem) => selectedItem._id === row._id
                        )}
                      />
                    ) : col.header === "Buttons" ? (
                      <div>
                        <Button
                          buttonText={"Edit"}
                          // handleClick={() => handleEdit(row)}
                          handleClick={() =>
                            handleEdit ? handleEdit(row) : null
                          }
                          buttonClass={"EditButton"}
                        />
                        <Button
                          buttonText={"Delete"}
                          handleClick={() =>
                            handleEdit ? handleEdit(row) : null
                          }
                          buttonClass={"DeleteButton"}
                        />
                      </div>
                    ) : col.header === "Update" ? (
                      <div>
                        <Button
                          buttonText={"Edit"}
                          // handleClick={() => handleEdit(row)}
                          handleClick={() =>
                            handleEdit ? handleEdit(row) : null
                          }
                          buttonClass={"EditButton"}
                        />
                      </div>
                    ) : col.header === "View" ? (
                      <div>
                        <Button
                          buttonText={"View"}
                          // handleClick={() => handleEdit(row)}
                          handleClick={() =>
                            handleSelectItem ? handleSelectItem(row) : null
                          }
                          buttonClass={"primaryButton"}
                        />
                      </div>
                    ) : col.header === "Approve" ? (
                      <div>
                        <Button
                          buttonText={"View"}
                          // handleClick={() => handleEdit(row)}
                          handleClick={() =>
                            handleSelectItem ? handleSelectItem(row) : null
                          }
                          buttonClass={"primaryButton"}
                        />
                      </div>
                    ) : (
                      <span>{row[col.accessor as keyof typeof row]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
