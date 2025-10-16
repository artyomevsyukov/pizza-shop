import ProductCard from "../../../components/ProductCard/ProductCard";
import type { MenuListProps } from "./MenuList.Props";
import styles from "./MenuList.module.css";

function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles["wrapper"]}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          rating={product.rating}
          price={product.price}
          name={product.name}
          description={product.ingredients.join(", ")}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default MenuList;
