export interface DistributorRewardsProps {}

export const Rewardscolumns = [
  { header: "Name", accessor: "merchandiseName" },
  { header: "Description", accessor: "merchandiseDescription" },
  { header: "Points", accessor: "pointsRequired" },
  { header: "Image", accessor: "merchandiseImage" },
  { header: "Reedem", accessor: "reedemButton" },
];

export interface MerchandiseType {
  _id: string;
  merchandiseName: string;
  merchandiseDescription: string;
  pointsRequired: number;
  merchandiseImage: string;
}

export type InitialStateType = {
  merchandiseData: MerchandiseType[];
  modal: boolean;
  currentMerchandise: MerchandiseType | {};
  selectedCategory: string;
  searchQuery: string;
  currentPage: number;
};

export type MerchandiseAction =
  | { type: "SET_MERCHANDISE_DATA"; payload: { data: MerchandiseType[] } }
  | { type: "SET_MODAL"; payload: { modal: boolean } }
  | {
      type: "SET_CURRENT_MERCHANDISE";
      payload: { currentMerchandise: MerchandiseType | {} };
    }
  | { type: "RESET_FORM" }
  | { type: "SET_SELECTED_CATEGORY"; payload: { selectedCategory: string } }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } }
  | { type: "SET_CURRENT_PAGE"; payload: { currentPage: number } };

export const InitialState: InitialStateType = {
  merchandiseData: [],
  modal: false,
  currentMerchandise: {},
  selectedCategory: "Merchandise",
  searchQuery: "",
  currentPage: 1,
};
