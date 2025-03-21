import React from 'react'
import s from "./style.module.css"
import { Label } from '@mui/icons-material';

export default function SearchByStatus({handleSelectChange}) {
    const AllStatus =["Completed",  "In Progress","Won't do"];

    return (
    <div>
        
      <select className={s.input} onClick={''} onChange={handleSelectChange}>
      <Label>Task's name</Label>
        <option value="">Sort by: Task's name</option>
        {AllStatus.map((theStatus,index)=>{
          return(
            <option value={theStatus} key={index}>{theStatus}</option>          )
        })}
      </select>
    </div>
  )
}
