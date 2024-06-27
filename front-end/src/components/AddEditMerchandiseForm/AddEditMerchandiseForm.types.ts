import { z } from "zod";
import {
  MerchandiseAction,
  MerchandiseType,
} from "../ManufacturerMerchandise/ManufacturerMerchandise.types";

export interface AddEditMerchandiseFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<MerchandiseAction>;
  currentMerchandise: MerchandiseType | {};
  handleEdit?: (row: MerchandiseType) => void;
  merchandiseMode: "add" | "edit" | "delete" | "reset";
}

export interface AddEditMerchandiseFields {
  merchandiseName: string;
  merchandiseDescription: string;
  pointsRequired: number;
  merchandiseImage: string;
}

export const merchandiseSchema = z.object({
  merchandiseName: z.string().min(1, { message: "Product name is required" }),
  merchandiseDescription: z.string(),
  pointsRequired: z.number(),
  merchandiseImage: z.string().url("Invalid URL format"),
});

export type MerchandiseSchemaType = z.infer<typeof merchandiseSchema>;
