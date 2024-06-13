export interface columnsType {
  header: string;
  accessor: string;
}
export interface dataType {
  productName: string;
  productImage: string;
  productprice: string;
  productDescription: string;
}
export interface TableProps {
  columns: columnsType[];
  data: dataType[];
}
