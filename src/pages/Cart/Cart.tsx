import styles from "./Cart.module.css";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import type { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import type { Product } from "../../interfaces/product.interface";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";

const DELIVERY = 169;

export function Cart() {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = useCallback(async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  }, []);

  const loadAllProduct = useCallback(async () => {
    const res = await Promise.all(items.map(i => getItem(i.id)));
    setCartProduct(res);
  }, [items, getItem]);

  useEffect(() => {
    loadAllProduct();
  }, [items, loadAllProduct]);

  const total = items.reduce((acc, item) => {
    const product = cartProduct.find(p => p.id === item.id);
    if (!product) return acc;
    return acc + item.count * product.price;
  }, 0);

  return (
    <>
      <Heading className={styles["header"]}>Корзина</Heading>

      {items.map(i => {
        const product = cartProduct.find(p => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={i.id} count={i.count} {...product} />;
      })}
      {total > 0 ? (
        <div className={styles["footer"]}>
          <div className={styles["row"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>
              {total}&nbsp;<span>₽</span>
            </div>
          </div>
          <hr className={styles["hr"]} />
          <div className={styles["row"]}>
            <div className={styles["text"]}>Доставка </div>
            <div className={styles["price"]}>
              {DELIVERY}&nbsp;<span>₽</span>
            </div>
          </div>
          <hr className={styles["hr"]} />
          <div className={styles["row"]}>
            <div className={styles["text"]}>Итог ({items.length})</div>
            <div className={styles["price"]}>
              {total + DELIVERY}&nbsp;<span>₽</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
