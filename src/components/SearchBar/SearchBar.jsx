import s from "./style.module.css";

export function SearchBar({ placeholder = "🔍 Search by name", onTextChange }) {
  return (
    <div className={s.container}>
      <input
        type="text"
        className={s.input}
        onChange={onTextChange}
        placeholder={placeholder}
      />
    </div>
  );
}
