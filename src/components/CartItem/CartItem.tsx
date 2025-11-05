import styles from "./CartItem.module.css";
import type { CartItemProps } from "./CartItem.props";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import CN from "classnames";

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const decrease = () => {
    dispatch(cartActions.decrease(props.id));
  };

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const del = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles["item"]}>
      <div
        className={styles["image"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles["description"]}>
        <div className={styles["name"]}>{props.name}</div>
        <div className={styles["price"]}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles["actions"]}>
        <button
          className={CN(styles["minus"], styles["btn"])}
          onClick={decrease}
        >
          <img src="/minus-icon.svg" alt="Удалить из корзины" />
        </button>
        <div className={styles["number"]}>{props.count}</div>
        <button
          className={CN(styles["plus"], styles["btn"])}
          onClick={increase}
        >
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles["remove"]} onClick={del}>
          <img src="/delete-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
