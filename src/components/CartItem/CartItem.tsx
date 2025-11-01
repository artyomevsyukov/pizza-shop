import styles from "./CartItem.module.css";
import type { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const decrease = () => {};

  const increase = () => {
    dispatch(cartActions.increase(props.id));
  };

  const remove = () => {};

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>

      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>
          {props.price}&nbsp;
          <span className={styles["currency"]}>₽</span>
        </div>
      </div>

      <div className={styles["actions"]}>
        <button className={styles["button"]} onClick={decrease}>
          <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles["button"]} onClick={increase}>
          <img src="/cart-button-icon.svg" alt="Удалить из корзину" />
        </button>
        <div className={styles["count"]}>{props.count}</div>
        <button className={styles["remove"]} onClick={remove}>
          <img src="/cart-button-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
