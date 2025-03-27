import { useDispatch } from "react-redux";
import { settheStatus } from "../../store/task/userSearch-slice";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import s from "./style.module.css"; // Import du CSS en module
import { Typography } from "@mui/material";
import { Button } from "@mui/base";

export default function SearchByStatus() {
  const status = ["Completed", "In Progress", "Won't do"];
  const dispatch = useDispatch();

  function onSelectArea(event) {
    dispatch(settheStatus(event.target.value));
  }

  function resetStatus() {
    dispatch(settheStatus(""));
    setShowDropdown(false); 
  }

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      {/* Select pour les grands écrans */}
      <div className={`${s.selectContainer}`}>
        <select className={s.input} onChange={onSelectArea}>
          <option value="">Sort by: Status</option>
          {status.map((theStatus, index) => (
            <option value={theStatus} key={index}>
              {theStatus}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown menu pour les petits écrans */}
      <div className={`${s.searchStatus} ${showDropdown ? s.dropdown : ""}`}>
        <button
          className={s.menuButton}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreVert />
        </button>
        {showDropdown && (
          <div className={s.dropdownMenu}>
            <Typography
              variant="h7"
              onClick={resetStatus}
              className={s.resetText} 
            >
              Sort by status
            </Typography>
            {status.map((theStatus, index) => (
              <div
                key={index}
                className={s.menuItem}
                onClick={() => onSelectArea({ target: { value: theStatus } })}
              >
                {theStatus}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
