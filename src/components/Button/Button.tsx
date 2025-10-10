import style from "./Button.module.css";
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
      className={CN(style["button"], style["accent"], className, {
        [style["small"]]: appearance === "small",
        [style["big"]]: appearance === "big"
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
