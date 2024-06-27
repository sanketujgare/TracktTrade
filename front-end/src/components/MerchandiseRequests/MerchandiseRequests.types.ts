export interface MerchandiseRequestsProps {}

export interface RequestsDataType {
  _id: string;
  distributorName: string;
  // username: string;
  merchandiseName: string;
  requestDate: string;
  status: string;
}

export const initialRequestsState = {
  requestsData: [] as RequestsDataType[],
  currentRequest: {} as RequestsDataType,
  modal: false,
  currentPage: 1,
};

export const MerchandiseRequestsColumns = [
  { header: "Distributor Name", accessor: "distributorName" },
  { header: "Merchandise Name", accessor: "merchandiseName" },
  // { header: "Request Date", accessor: "requestDate" },
  { header: "Status", accessor: "status" },
  { header: "Approve", accessor: "approve" },
];
