import { Await, Link, useLoaderData } from "react-router-dom";
import type { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import Heading from "../../components/Heading/Heading";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";
import cartIcon from "/cart-button-icon.svg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import CN from "classnames";

export function Product() {
  const { data } = useLoaderData() as { data: Promise<Product> };
  const dispatch = useDispatch<AppDispatch>();

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
          const add = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(cartActions.add(product.id));
          };
          return (
            <div className={styles["product"]}>
              <div className={styles["header"]}>
                <div className={styles["header-left"]}>
                  <Link to={"/"} className={styles["header__btn"]}>
                    <img src="/back-arrow-icon.svg" alt="Назад" />
                  </Link>
                  <Heading>{product.name}</Heading>
                </div>

                <Button
                  appearance="small"
                  className={styles["add-to-cart"]}
                  onClick={add}
                >
                  <img src={cartIcon} alt="Корзина" /> <span>В корзину</span>
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
                  <div className={CN(styles["price"], styles["row"])}>
                    <div className={styles["price__text"]}>Цена</div>
                    <div className={styles["price__value"]}>
                      {product.price}&nbsp;
                      <span className={styles["currency"]}>₽</span>
                    </div>
                  </div>

                  <hr className={styles["hr"]} />
                  <div className={CN(styles["rating"], styles["row"])}>
                    <div className={styles["rating__text"]}>Рейтинг</div>
                    <div className={styles["rating__value"]}>
                      <span>{product.rating} </span>
                      <img src="/star-icon.svg" alt="Звезда" />
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
          );
        }}
      </Await>
    </Suspense>
  );
}
