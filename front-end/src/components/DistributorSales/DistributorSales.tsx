import CustomerSales from "../CustomerSales/CustomerSales.tsx";
import styles from "./DistributorSales.module.scss"; 
import { DistributorSalesProps } from "./DistributorSales.types.ts" 
 
const DistributorSales = ({}: DistributorSalesProps) => { 
    
    return(
        <CustomerSales/>
    )
} 
 
export default DistributorSales 
