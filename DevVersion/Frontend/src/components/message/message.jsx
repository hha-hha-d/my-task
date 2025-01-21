import style from "./message.module.scss";

export default function Message({ type, message }) {
  const typeOfMessage = {
    error: "Произошла ошибка!",
  };

  return (
    <div className={`${style.message} ${style.error}`}>
      <div className={style["message-name"]}>{typeOfMessage[type ?? null]}</div>
      <div className={style["message-text"]}>{message}</div>
    </div>
  );
}
