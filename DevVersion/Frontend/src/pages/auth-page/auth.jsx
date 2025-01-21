import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Message from "../../components/message/message";
import { useState } from "react";

import style from "./auth.module.scss";

import auth from "../../helpers/auth/auth";

import { useDispatch } from "react-redux";
import { changeAuth, setUserData } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

import preloader from "../../assets/preloader.gif";

export default function Auth() {
  const [userData, changeUserData] = useState({
    login: "",
    password: "",
  });
  const [checkState, changeCheckState] = useState({
    show: false,
    message: "",
  });
  const [showPreloader, changeShowPreloader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(value) {
    changeUserData((state) => {
      return {
        ...state,
        login: value,
      };
    });
    changeCheckState((state) => {
      return { ...state, show: false };
    });
  }

  function handlePassword(value) {
    changeUserData((state) => {
      return {
        ...state,
        password: value,
      };
    });
    changeCheckState((state) => {
      return { ...state, show: false };
    });
  }
  function handleEnterButton() {
    if (!userData.login || !userData.password) {
      changeCheckState((state) => {
        return {
          ...state,
          show: true,
          message: "Вы не ввели логин или пароль.",
        };
      });
      return;
    }

    changeShowPreloader(() => true);
    auth(userData)
      .then((res) => {
        changeShowPreloader(() => false);
        dispatch(changeAuth(true));

        const userData = res.data.userData;
        dispatch(setUserData(userData));
        console.log(userData);

        const token = res.data.token;
        sessionStorage.setItem("token", token);

        navigate("/search");
      })
      .catch(() => {
        changeShowPreloader(() => false);
        changeCheckState((state) => {
          return {
            ...state,
            show: true,
            message: "Введен неверный логин или пароль.",
          };
        });
      });
    return;
  }

  return (
    <>
      <div className={style.entry}>
        <div className={style["entry-form"]}>
          <h1>Вход в базу</h1>
          <Input handler={(value) => handleLogin(value)} label={"Логин"} />
          <Input
            handler={(value) => handlePassword(value)}
            label={"Пароль"}
            type={"password"}
          />
          {checkState.show ? (
            <Message type="error" message={checkState.message} />
          ) : null}
          {/* <div className={style.buttonbox}> */}
          {/* <label htmlFor="checkbox" className={style.label}>
              <input
                style={{ cursor: "pointer" }}
                id="checkbox"
                type="checkbox"
              ></input>{" "}
              &nbsp; Остаться в сети
            </label> */}
          {showPreloader ? <img src={preloader} /> : null}
          <Button
            value="Войти"
            action={() => {
              handleEnterButton();
            }}
            size="medium"
            disabled={checkState.show}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
