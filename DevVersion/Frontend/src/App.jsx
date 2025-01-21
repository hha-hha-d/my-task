import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/auth-page/auth";
import SearchPage from "./pages/search-page/search-page";
import SearchByData from "./pages/search-page/search-by-data/search-by-data";

import { useSelector, useDispatch } from "react-redux";
import { changeAuth, setUserData } from "./store/authSlice";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      axios
        .post("http://localhost:3000/checkToken", {
          token: userToken,
        })
        .then((res) => {
          const status = res.status;
          console.log(status);
          if (status === 200) {
            dispatch(changeAuth(true));
            dispatch(setUserData(res.data));
          } else {
            dispatch(changeAuth(false));
          }
        });
    } else {
      dispatch(changeAuth(false));
    }
  }, []);

  const auth = useSelector((state) => state.auth.authed);
  console.log(auth);

  return (
    <Routes>
      <Route
        path="/"
        element={!auth ? <Auth /> : <Navigate to={"/search"} />}
      />

      {auth ? (
        <Route path="search" element={<SearchPage />}>
          <Route index element={<SearchByData />} />
          <Route path="generate_search" element={<div>В процессе</div>} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to={"/"} />} />
      )}
    </Routes>
  );
}

export default App;
