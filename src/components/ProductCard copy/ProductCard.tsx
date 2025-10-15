import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import type { ProductCardProps } from "./ProductCard.props";

function ProductCard(props: ProductCardProps) {
  return (
    <div className={styles.cards}>
      <Link to={"/"} className={styles.link}>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__price"]}>
            {props.price}
            <span className={styles.currency}>₽</span>
          </div>
          <img
            className={styles["product-card__img"]}
            src={props.image}
            alt="pizza"
          />

          {props.rating ? (
            <div className={styles["product-card__rating"]}>
              <span>{props.rating}</span>
              <img src="/star-icon.svg" alt="Звезда" />
            </div>
          ) : (
            <></>
          )}
          <div className={styles["footer"]}>
            <h2 className={styles["product-card__title"]}>{props.title}</h2>
            <div className={styles["product-card__desc"]}>
              {props.description}
            </div>
          </div>
        </div>
      </Link>
      <Link to={"/"} className={styles.link}>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__price"]}>
            {props.price}
            <span className={styles.currency}>₽</span>
          </div>
          <img
            className={styles["product-card__img"]}
            src={props.image}
            alt="pizza"
          />

          {props.rating ? (
            <div className={styles["product-card__rating"]}>
              <span>{props.rating}</span>
              <img src="/star-icon.svg" alt="Звезда" />
            </div>
          ) : (
            <></>
          )}
          <div className={styles["footer"]}>
            <h2 className={styles["product-card__title"]}>{props.title}</h2>
            <div className={styles["product-card__desc"]}>
              {props.description}
            </div>
          </div>
        </div>
      </Link>
      <Link to={"/"} className={styles.link}>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__price"]}>
            {props.price}
            <span className={styles.currency}>₽</span>
          </div>
          <img
            className={styles["product-card__img"]}
            src={props.image}
            alt="pizza"
          />

          {props.rating ? (
            <div className={styles["product-card__rating"]}>
              <span>{props.rating}</span>
              <img src="/star-icon.svg" alt="Звезда" />
            </div>
          ) : (
            <></>
          )}
          <div className={styles["footer"]}>
            <h2 className={styles["product-card__title"]}>{props.title}</h2>
            <div className={styles["product-card__desc"]}>
              {props.description}
            </div>
          </div>
        </div>
      </Link>
      <Link to={"/"} className={styles.link}>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__price"]}>
            {props.price}
            <span className={styles.currency}>₽</span>
          </div>
          <img
            className={styles["product-card__img"]}
            src={props.image}
            alt="pizza"
          />

          {props.rating ? (
            <div className={styles["product-card__rating"]}>
              <span>{props.rating}</span>
              <img src="/star-icon.svg" alt="Звезда" />
            </div>
          ) : (
            <></>
          )}
          <div className={styles["footer"]}>
            <h2 className={styles["product-card__title"]}>{props.title}</h2>
            <div className={styles["product-card__desc"]}>
              {props.description}
            </div>
          </div>
        </div>
      </Link>
      <Link to={"/"} className={styles.link}>
        <div className={styles["product-card"]}>
          <div className={styles["product-card__price"]}>
            {props.price}
            <span className={styles.currency}>₽</span>
          </div>
          <img
            className={styles["product-card__img"]}
            src={props.image}
            alt="pizza"
          />

          {props.rating ? (
            <div className={styles["product-card__rating"]}>
              <span>{props.rating}</span>
              <img src="/star-icon.svg" alt="Звезда" />
            </div>
          ) : (
            <></>
          )}
          <div className={styles["footer"]}>
            <h2 className={styles["product-card__title"]}>{props.title}</h2>
            <div className={styles["product-card__desc"]}>
              {props.description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;
