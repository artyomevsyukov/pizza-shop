import { forwardRef } from "react";
import styles from "./Search.module.css";
import CN from "classnames";
import type { SearchProps } from "./Search.props";
import searchIcon from "/search-icon.svg";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { className, isValid = true, ...props },
  ref
) {
  return (
    <div className={styles["input-wrapper"]}>
      <input
        {...props}
        ref={ref}
        className={CN(styles["input"], className, {
          [styles["invalid"]]: !isValid
        })}
      />
      <img className={styles["icon"]} src={searchIcon} alt="Иконка поиска" />
    </div>
  );
});

export default Search;
