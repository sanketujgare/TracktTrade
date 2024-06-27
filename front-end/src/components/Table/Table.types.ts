import { DistributorType } from "../DistributorList/DistributorList.types";
import { DistributorInventoryType } from "../DistributorInventory/DistributorInventory.types";
import { productType } from "../Products/Products.types";
import { NewDistributorInventoryType } from "../DistributorOrderModal/DistributorOrderModal.types";
import { CustomerType } from "../ManufacturerCustomers/ManufacturerCustomers.types";
import { SaleData } from "../CustomerSales/CustomerSales.types";
import { DistributorOrderDataType } from "../ManufacturerOrders/ManufacturerOrders.types";
import { MerchandiseType } from "../ManufacturerMerchandise/ManufacturerMerchandise.types";

export interface columnsType {
  header: string;
  accessor: string;
}

export interface TableProps {
  columns: columnsType[];
  data:
    | productType[]
    | DistributorType[]
    | DistributorInventoryType[]
    | NewDistributorInventoryType[]
    | MerchandiseType[]
    | {}[];
  handleEdit?: (
    row: productType | DistributorType | DistributorType | MerchandiseType
  ) => void;
  handleDelete?: (
    row: productType | DistributorType | DistributorType | MerchandiseType
  ) => void;
  handleSelectItem?: (
    item: DistributorInventoryType | CustomerType | DistributorOrderDataType
  ) => void;
  selectedItems?: DistributorInventoryType[];
}

export interface BaseType {}

// export interface TableProps<T extends productType, DistributorType> {
//   columns: columnsType[];
//   data: T[];
//   handleEdit: (row: T) => void;
//   handleDelete: (row: T) => void;
// }
