import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

function Success() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <div className={styles["success"]}>
      <img src="/pizza.png" alt="Изображение пиццы" />
      <div className={styles["text"]}>Ваш заказ успешно оформлен!</div>
      <Button
        appearance="big"
        onClick={() => {
          dispatch(cartActions.clear());
          navigate("/");
        }}
      >
        Сделать новый заказ
      </Button>
    </div>
  );
}
export default Success;
