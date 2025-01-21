import { useEffect, useState } from "react";
import style from "./input.module.scss";

export default function Input({
  initialValue,
  handler,
  validator,
  label,
  name,
  placeholder,
  size,
  type,
}) {
  const [localValue, changeLocalValue] = useState(
    initialValue ? initialValue : ""
  );
  // const [validErrorMessage, changeErrorValidMessage] = useState('');

  useEffect(() => {}, [localValue]);

  return (
    <div className={`${style.inputWrapper}`}>
      <label className={style.label} htmlFor={label}>
        {label}
      </label>
      <input
        className={`${style.input} ${style[size]}`}
        value={localValue}
        id={label ? label : ""}
        onChange={(elem) => {
          changeLocalValue(elem.target.value);
          handler(elem.target.value);
        }}
        placeholder={placeholder ? placeholder : null}
        type={type}
      ></input>
      {/* {validErrorMessage ? (
        <p className={`${style.errorMessage}`}>{validErrorMessage}</p>
      ) : null} */}
    </div>
  );
}
