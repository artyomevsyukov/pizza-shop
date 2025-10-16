import stiles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");

  async function getMenu() {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.message);
      }
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
      {error && <>{error}</>}
      {!isLoading && <MenuList products={products} />}
      {isLoading && <>Загружаем меню...</>}
    </>
  );
}

export default Menu;
