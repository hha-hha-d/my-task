import style from "./search-by-data.module.scss";

import Input from "../../../components/input/input";
import Button from "../../../components/button/button";
import GridExample from "../../../components/table/table";
import { useState } from "react";

import searchPerson from "../../../helpers/search/searchPers";

import { useDispatch, useSelector } from "react-redux";
import { addPersons } from "../../../store/personsDataSlice";

export default function SearchByData() {
  const dispatch = useDispatch();
  const [valueForSearch, changeValueForSearch] = useState("");

  function buttonHandler() {
    searchPerson(valueForSearch).then((res) => dispatch(addPersons(res.data)));
  }

  const personsData = useSelector((select) => select.persons.persons);
  console.log(personsData);
  return (
    <div>
      <div className={style.searchField}>
        <Input
          size="medium"
          placeholder={"Введите ФИО, дату рождения или id"}
          value={valueForSearch}
          handler={(value) => {
            changeValueForSearch(() => value);
          }}
        />
        <Button value="Поиск" size="medium" action={() => buttonHandler()} />
      </div>
      <div className={style.table}>
        <GridExample data={personsData} />
      </div>
    </div>
  );
}
