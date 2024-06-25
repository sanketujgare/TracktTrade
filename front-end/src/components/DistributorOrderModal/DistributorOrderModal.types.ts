import {
  DistributorInventoryAction,
  DistributorInventoryType,
} from "../DistributorInventory/DistributorInventory.types";
import { productType } from "../Products/Products.types";

export interface NewDistributorInventoryType extends productType {
  quantity: number;
}
export interface DistributorOrderModalProps {
  selectedItems: NewDistributorInventoryType[];
  handleOrder: (
    items: DistributorInventoryType[] | NewDistributorInventoryType[]
  ) => void;
  handleClose: () => void;

  handleSelectedItemQuantity: (id: string, quantity: number) => void;
}
