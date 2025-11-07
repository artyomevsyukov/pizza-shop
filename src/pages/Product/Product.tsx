import { Await, useLoaderData } from "react-router-dom";
import type { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import Heading from "../../components/Heading/Heading";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import cartIcon from "/cart-button-icon.svg";

export function Product() {
  const { data } = useLoaderData() as { data: Promise<Product> };

  return (
    <Suspense
      fallback={
        <>
          Загрузка продукта...
          <Spinner />
        </>
      }
    >
      <Await resolve={data}>
        {(product: Product) => {
          return (
            <div className={styles["product"]}>
              <div className={styles["header"]}>
                <button>Назад</button>
                <Heading>{product.name}</Heading>
                <Button appearance="small">
                  <img src={cartIcon} alt="Корзина" /> В корзину
                </Button>
              </div>
              <div className={styles["card"]}>
                <div className={styles["left"]}>
                  <img
                    className={styles["img"]}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className={styles["right"]}>
                  <div className="right-wrapper">
                    <div className={styles["price"]}>
                      <div className={styles["price__text"]}>Цена</div>
                      <div className={styles["price__value"]}>
                        {product.price}&nbsp;
                        <span className={styles["currency"]}>₽</span>
                      </div>
                    </div>

                    <hr className={styles["hr"]} />
                    <div className={styles["rating"]}>
                      <div className={styles["rating__text"]}>Рейтинг</div>
                      <div className={styles["rating__value"]}>
                        {product.rating}
                      </div>
                    </div>
                    <div className={styles["ingredients"]}>
                      <div className={styles["ingredients__text"]}>Состав:</div>
                      <div className={styles["ingredients__value"]}>
                        <ul>
                          {product.ingredients.map((p, i) => {
                            return <li key={i}>{p}</li>;
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
