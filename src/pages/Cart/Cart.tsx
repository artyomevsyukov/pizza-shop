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

interface CartProduct extends Product {
  count: number;
}

export function Cart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  // const getItem = useCallback(async (id: number) => {
  //   const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
  //   return data;
  // }, []);

  // const loadAllProduct = useCallback(async () => {
  //   const res = await Promise.all(items.map(i => getItem(i.id)));
  //   setCartProduct(res);
  // }, [items, getItem]);

  const loadAllProducts = useCallback(async () => {
    const products = await Promise.all(
      items.map(async item => {
        const { data } = await axios.get<Product>(
          `${PREFIX}/products/${item.id}`
        );
        return {
          ...data,
          count: item.count
        };
      })
    );
    setCartProducts(products);
  }, [items]);

  useEffect(() => {
    loadAllProducts();
  }, [items, loadAllProducts]);

  // const total = items.reduce((acc, item) => {
  //   const product = cartProduct.find(p => p.id === item.id);
  //   if (!product) return acc;
  //   return acc + item.count * product.price;
  // }, 0);

  const total = cartProducts.reduce(
    (acc, product) => acc + product.count * product.price,
    0
  );

  return (
    <>
      <Heading className={styles["header"]}>Корзина</Heading>

      {/* {items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={i.id}  count={i.count}  {...product} />;
      })} */}
      {cartProducts.map(product => (
        <CartItem key={product.id} {...product} />
      ))}
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
            <div className={styles["text"]}>
              Итог <span className="total-count">({items.length})</span>
            </div>
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
