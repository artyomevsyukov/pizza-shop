import stiles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { useEffect, useState, type ChangeEvent } from "react";
import type { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";
import { Spinner } from "../../components/Spinner/Spinner";
import { useDebounce } from "../../hooks/useDebounce";

function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [filter, setFilter] = useState<string>("");
  const debounceFilter = useDebounce(filter, 500);

  useEffect(() => {
    getMenu(debounceFilter);
  }, [debounceFilter]);

  async function getMenu(name?: string) {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name
        }
      });
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
  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={stiles["head"]}>
        <Heading>Menu</Heading>
        <Search
          name="search"
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        />
      </div>
      {error && <>{error}</>}
      {!isLoading && products.length > 0 && <MenuList products={products} />}
      {isLoading && (
        <>
          Загружаем меню... <Spinner />
        </>
      )}
      {!isLoading && products.length === 0 && <>Ничего не найдено</>}
    </>
  );
}

export default Menu;
