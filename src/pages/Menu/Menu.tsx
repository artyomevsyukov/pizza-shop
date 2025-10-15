import stiles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";

export function Menu() {
  return (
    <div className={stiles["head"]}>
      <Heading>Menu</Heading>
      <Search name="search" placeholder="Введите блюдо или состав" />
    </div>
  );
}
