import styles from "./Heading.module.css";
import type { HeadingProps } from "./Heading.props";
import CN from "classnames";

function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h1 className={CN(styles["head"], className)} {...props}>
      {children}
    </h1>
  );
}
export default Heading;
