import { NavLink, Outlet } from "react-router-dom";
import CN from "classnames";

import styles from "./Layout.module.css";

import cartIcon from "/cart-icon.svg";
import avatar from "/avatar.png";
import menuIcon from "/menu-icon.svg";
import exitIcon from "/exit-icon.svg";
import Button from "../../components/Button/Button";

export function LayoutMenu() {
  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src={avatar} className={styles["avatar"]} alt="Avatar" />
          <div className={styles["name"]}>Ваше имя</div>
          <div className={styles["email"]}>name@ya.ru</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              CN(styles["link"], {
                [styles.active]: isActive
              })
            }
          >
            <img className={styles["menu-icon"]} src={menuIcon} alt="Меню" />
            Меню
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              CN(styles["link"], {
                [styles.active]: isActive
              })
            }
          >
            <img className={styles["menu-icon"]} src={cartIcon} alt="Корзина" />{" "}
            Корзина
          </NavLink>
        </div>
        <Button className={styles["exit"]}>
          <img src={exitIcon} alt="Выход" /> Выход
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
