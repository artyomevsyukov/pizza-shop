import stiles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import ProductCard from "../../components/ProductCard/ProductCard";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios from "axios";

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getMenu() {
    try {
      setIsLoading(true);
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }
  }

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={stiles["head"]}>
        <Heading>Menu</Heading>
        <Search name="search" placeholder="Введите блюдо или состав" />
      </div>
      {!isLoading &&
        products.map(product => (
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
      {isLoading && <>Загружаем меню...</>}
    </>
  );
}
