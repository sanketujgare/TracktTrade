import {
  DistributorInventoryAction,
  DistributorInventoryType,
} from "../DistributorInventory/DistributorInventory.types";
import { ManufacturerInventoryType } from "../ManufacturerInventory/ManufacturerInventory.types";
import { productType } from "../Products/Products.types";

export interface ManufacturerInventoryUpdateModalType extends productType {
  quantity: number;
}
export interface ManufacturerInventoryUpdateModalProps {
  selectedItems: ManufacturerInventoryUpdateModalType[];
  handleOrder: (
    items: ManufacturerInventoryType[] | ManufacturerInventoryUpdateModalType[]
  ) => void;
  handleClose: () => void;

  handleSelectedItemQuantity: (id: string, quantity: number) => void;
}
