import Image from "next/image";
import styles from "./page.module.css";
import ProductsPage from "./api/products/page";
 

export default function Home() {

  
  return (
    <div className={styles.page}>
     <h1>Wello horld</h1>
     <ProductsPage/>
    </div>
    
  );
}
