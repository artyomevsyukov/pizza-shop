import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import type { LoginFormData } from "./LoginProps";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    console.log("Данные для входа:", formData);
    const { email, password } = formData;
    await sendLogin(email, password);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles["login"]}>
      <Heading>Вход</Heading>
      {loginErrorMessage && (
        <div className={styles["error"]}>{loginErrorMessage}</div>
      )}
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
