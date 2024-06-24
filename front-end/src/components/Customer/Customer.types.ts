import { CustomerType } from "../ManufacturerCustomers/ManufacturerCustomers.types";

export interface CustomerProps {
  data: CustomerType | {};
  handleCloseModal: () => void;
}
