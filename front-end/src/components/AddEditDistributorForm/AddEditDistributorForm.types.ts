//  export interface AddEditDistributorFormProps {}

import { z } from "zod";
import {
  DistributorType,
  DistributorsAction,
} from "../DistributorList/DistributorList.types";

export interface AddEditDistributorFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: React.Dispatch<DistributorsAction>;
  currentDistributor: DistributorType | {};
  handleEdit?: (row: DistributorType) => void;
  DistributorMode: "add" | "edit" | "delete" | "reset";
}

// export interface AddEditDistributorFields {
//   _id?: string;
//   name: string;
//   username: string;
//   password: string;
//   email: string;
//   role?: string;
//   mobileNumber: string;
//   totalPoints: number;
// }

export const distributorFormSchema = z.object({
  //    _id:z.string().optional(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["Distributor"]).optional(),
  mobileNumber: z.string(),
  email: z.string(),
  totalPoints: z.number().optional().default(0),
});

export type DistributorSchemaType = z.infer<typeof distributorFormSchema>;
