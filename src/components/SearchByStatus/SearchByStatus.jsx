import { useDispatch } from "react-redux";
import s from "./style.module.css";
import { settheStatus } from "../../store/task/userSearch-slice";

export default function SearchByStatus() {
  const status =["Completed",  "In Progress","Won't do"];

  const  dispatch = useDispatch();

  function onSelectArea(event){
    dispatch(settheStatus(event.target.value))
  }
  return (
    <div>
      <select className={s.input} onClick={''} onChange={onSelectArea}>
        <option value="">Sort by: Status</option>
        {status.map((theStatus,index)=>{
          return(
            <option value={theStatus} key={index}>{theStatus}</option>          )
        })}
      </select>
  </div>
  )
}
