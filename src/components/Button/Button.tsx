import style from "./Button.module.css";
import type { ButtonProps } from "./Button.props";
import cn from "classnames";

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(style["button"], style["accent"], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
