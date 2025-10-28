import { NavLink, Outlet, useNavigate } from "react-router-dom";
import CN from "classnames";

import styles from "./Layout.module.css";

import cartIcon from "/cart-icon.svg";
import avatar from "/avatar.png";
import menuIcon from "/menu-icon.svg";
import exitIcon from "/exit-icon.svg";
import Button from "../../components/Button/Button";
import { getProfile, userActions } from "../../store/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../../store/store";

export function LayoutMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, jwt } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      dispatch(getProfile());
    }
  }, [dispatch, jwt]);

  const logOut = () => {
    dispatch(userActions.logOut());
    navigate("/auth/login");
  };

  const displayName = profile?.name || "Ваше имя";
  const displayEmail = profile?.email || "name@ya.ru";

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img src={avatar} className={styles["avatar"]} alt="Avatar" />
          <div className={styles["name"]}>{displayName}</div>
          <div className={styles["email"]}>{displayEmail}</div>
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
        <Button className={styles["exit"]} onClick={logOut}>
          <img src={exitIcon} alt="Выход" /> Выход
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
