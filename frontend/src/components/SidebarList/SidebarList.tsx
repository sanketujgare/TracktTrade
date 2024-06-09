import { Link } from "react-router-dom";
import styles from "./SidebarList.module.scss";
import { SidebarListProps } from "./SidebarList.types.ts";
import Sidebar from "../Sidebar/Sidebar.tsx";
import { useState } from "react";

const SidebarList = ({ lists }: SidebarListProps) => {
  const [expandedTab, setExpandedTab] = useState<string | null>(null);

  const handleToggle = (tabName: string) => {
    setExpandedTab(expandedTab === tabName ? null : tabName);
  };
  return (
    <>
      {lists.map((tab, index) => (
        <li key={index}>
          {Array.isArray(tab.path) ? (
            <>
              <Link
                className={styles.Link}
                to={""}
                onClick={() => handleToggle(tab.tabName)}
              >
                {tab.tabName}
              </Link>
              {expandedTab === tab.tabName && <SidebarList lists={tab.path} />}
            </>
          ) : (
            <Link className={styles.Link} to={tab.path}>
              {tab.tabName}
            </Link>
          )}
        </li>
      ))}
    </>
  );
};

export default SidebarList;
