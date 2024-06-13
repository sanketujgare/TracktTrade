export interface ListsType {
  tabName: string;
  path: string | ListsType[];
}
export interface SidebarListProps {
  lists: ListsType[];
}
