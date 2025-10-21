import { useState } from "react";
import Heading from "../../components/Heading/Heading";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import type { LoginFormData } from "./LoginProps";
import Input from "../../components/Input/Input";

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    login: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Данные для входа:", formData);
  };

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>

      <form className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles["field"]}>
          <label htmlFor="login" className={styles.label}>
            Ваш Email
          </label>
          <Input
            id="login"
            name="login"
            type="text"
            placeholder="Email"
            required
            // className={styles.input}
            onChange={handleChange}
            value={formData.login}
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password" className={styles.label}>
            Ваш пароль
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            required
            // className={styles.input}
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <Button appearance="small" type="submit">
          Вход
        </Button>
      </form>
      <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}

export default Login;
