import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import styles from "./Register.module.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import type { RegisterForm } from "./RegisterProps";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
    name: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

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
    dispatch(userActions.clearRegisterError());
    console.log("Данные для регистрации:", formData);

    // await sendRegistrationData(formData);
    await dispatch(register(formData));
  };

  // const sendRegistrationData = async (formData: RegisterForm) => {
  //   dispatch(register(formData));
  // };

  return (
    <div className={styles["register"]}>
      <Heading>Регистрация</Heading>
      {registerErrorMessage && (
        <div className={styles["error"]}>{registerErrorMessage}</div>
      )}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email" className={styles.label}>
            Ваш Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
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
        <div className={styles["field"]}>
          <label htmlFor="name" className={styles.label}>
            Ваше имя
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            required
            // className={styles.input}
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <Button appearance="small" type="submit">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles["links"]}>
        <div>Есть аккаунт?</div>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  );
}
export default Register;
