import stiles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import ProductCard from "../../components/ProductCard/ProductCard";

export function Menu() {
  return (
    <>
      <div className={stiles["head"]}>
        <Heading>Menu</Heading>
        <Search name="search" placeholder="Введите блюдо или состав" />
      </div>
      <ProductCard
        id={1}
        rating={4.5}
        price={300}
        name="Наслаждение"
        description=" Салями, руккола, помидоры, оливки"
        image="/product-demo.png"
      />
    </>
  );
}
