import { useEffect, useState } from "react";
import styles from "./DistributorHome.module.scss";
import {
  DistributorHomeProps,
  distributorInfoType,
} from "./DistributorHome.types.ts";
import { getSpecificdistributorData } from "../../services/Distributor.services.ts";

const DistributorHome = ({}: DistributorHomeProps) => {
  const [distributorData, setDistributorData] = useState<distributorInfoType>(
    {}
  );
  useEffect(() => {
    getspecificDistributor();
  }, []);

  const getspecificDistributor = async () => {
    try {
      // const distributorID = localStorage.getItem("userId");
      const data = await getSpecificdistributorData();

      setDistributorData(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.DistributorContainer}>
      <span className={styles.DistributorName}>{distributorData.name}</span>
      <div className={styles.Content}>
        <span className={styles.Name}>Mobile Number</span>

        <span className={styles.Info}>{distributorData.mobileNumber}</span>
      </div>
      <div className={styles.Content}>
        <span className={styles.Name}>Email</span>
        <span className={styles.Info}>{distributorData.email}</span>
      </div>
      <div className={styles.Content}>
        <span className={styles.Name}>Total Points</span>
        <span className={styles.Info}>{distributorData.totalPoints}</span>
      </div>
    </div>
  );
};

export default DistributorHome;
