import style from "./button.module.scss";

export default function Button({ value, action, size, disabled }) {
  return (
    <>
      <div
        className={`${style.button} ${style[size]}`}
        onClick={() => {
          if (!disabled) {
            action();
          }
        }}
      >
        {value}
      </div>
    </>
  );
}
