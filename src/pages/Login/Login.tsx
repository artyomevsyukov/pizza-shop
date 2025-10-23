import { useState } from "react";
import Heading from "../../components/Heading/Heading";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import type { LoginFormData } from "./LoginProps";
import Input from "../../components/Input/Input";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import type { LoginResponse } from "../../interfaces/auth.interface";

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log("Данные для входа:", formData);
    const { email, password } = formData;
    await sendLogin(email, password);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email,
        password
      });
      console.log("Post: ", data);
      localStorage.setItem("jwt", data.access_token);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.message);
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>
      {error && <div className={styles["error"]}>{error}</div>}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email" className={styles.label}>
            Ваш Email
          </label>
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            required
            // className={styles.input}
            onChange={handleChange}
            value={formData.email}
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
