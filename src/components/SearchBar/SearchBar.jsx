import { Box } from "@mui/joy";
import s from "./style.module.css";

export function SearchBar({ placeholder = "🔍 Search by name ...", onTextChange }) {
  return (
    <Box 
      className={s.container} 
      sx={{ width: { xs: '80%', sm: '185px' } }}
    >
      <input
        type="text"
        className={s.input}
        onChange={onTextChange}
        placeholder={placeholder}
        style={{ width: '100%' }} // Permet à l'input de suivre la largeur du Box
      />
    </Box>
  );
}
