import { Link } from "react-router-dom";
import styles from "./SidebarList.module.scss";
import { SidebarListProps } from "./SidebarList.types.ts";
import Sidebar from "../Sidebar/Sidebar.tsx";
import { useState } from "react";

const SidebarList = ({ lists }: SidebarListProps) => {
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const [acitveTab, setActiveTab] = useState<string | null>(null);

  const handleToggle = (tabName: string) => {
    setExpandedTab(expandedTab === tabName ? null : tabName);
  };
  const handleClick = (tabname: string) => {
    setActiveTab(tabname);
  };
  return (
    <>
      <ul className={styles.SideBarList}>
        {lists.map((tab, index) => (
          <li
            key={index}
            className={
              acitveTab === tab.tabName ? styles.ActiveLiTab : styles.LiTab
            }
            onClick={() => handleClick(tab.tabName)}
          >
            {Array.isArray(tab.path) ? (
              <>
                <Link
                  className={styles.Link}
                  to={""}
                  onClick={() => handleToggle(tab.tabName)}
                >
                  {tab.tabName}
                </Link>
                {expandedTab === tab.tabName && (
                  <SidebarList lists={tab.path} />
                )}
              </>
            ) : (
              <Link className={styles.Link} to={tab.path}>
                {tab.tabName}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarList;
