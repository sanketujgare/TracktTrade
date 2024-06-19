import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import { DropDownProps } from "./DropDown.types";

const DropDown = ({ options, selected, handleSelect }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    // handleSelect({
    //   target: { value: option },
    // } as React.ChangeEvent<HTMLSelectElement>);
    handleSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.DropDownContainer}>
      <button className={styles.DropDownButton} onClick={toggleDropDown}>
        {selected}
        <span
          className={`${styles.DropDownArrow} ${isOpen ? styles.open : ""}`}
        >
          &#x25BC;
        </span>
      </button>
      <div className={`${styles.DropDownMenu} ${isOpen ? styles.open : ""}`}>
        {options.map((option) => (
          <div
            key={option}
            className={styles.DropDownMenuItem}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
