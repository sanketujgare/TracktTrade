export interface DropDownProps {
  options: string[];
  selected: string;
  //   handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSelect: (option: string) => void;
}

// export type DropDownProps = {

// };
