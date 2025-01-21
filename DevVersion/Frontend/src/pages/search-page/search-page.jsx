import style from "./search-page.module.scss";

import { Outlet, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/button/button";

import { changeAuth } from "../../store/authSlice";
export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector((state) => state.auth.userData);

  const disp = useDispatch();

  function exit() {
    sessionStorage.removeItem("token");
    disp(changeAuth(false));
  }

  return (
    <div className={style.search}>
      <div className={style.sideBar}>
        <div className={style.userBox}>
          <p style={{ fontSize: "25px" }}>{userInfo.surname}</p>
          <p>{`${userInfo.name + " " + userInfo.patronymic}`}</p>
          <div>
            <Button value={"Выйти"} size="small" action={() => exit()} />
          </div>
        </div>
        <div className={style.directoryList}>
          <div
            className={`${style.directoryButton} ${
              location.pathname === "/search"
                ? style.directoryButtonActive
                : null
            }`}
            onClick={() => navigate("")}
          >
            Поиск по лицам
          </div>
          <div
            className={`${style.directoryButton} ${
              location.pathname === "/search/generate_search"
                ? style.directoryButtonActive
                : null
            }`}
            onClick={() => navigate("generate_search")}
          >
            Генерирование
          </div>
        </div>
      </div>
      <div className={style.workspace}>
        <Outlet />
      </div>
    </div>
  );
}
