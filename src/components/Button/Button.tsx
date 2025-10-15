import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.props";
import CN from "classnames";

function Button({
  appearance = "small",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={CN(styles["button"], styles["accent"], className, {
        [styles["small"]]: appearance === "small",
        [styles["big"]]: appearance === "big"
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
