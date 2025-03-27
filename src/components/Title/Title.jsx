import { Button, Input, Stack, Textarea } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Pencil } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux';
import { settitle } from '../../store/task/title_slice';

export default function Title() {

    const dispatch = useDispatch();
    const [isEditable,setIsEditable]= useState(false);

    function handleClick(){
        setIsEditable(!isEditable)
    }
    function handleSave(){
        setIsEditable(false);
        dispatch(settitle(updateFormValues));      
    }

    const theTitle = useSelector((store)=>store.TITLE.theTitle);

    function updateFormValues(e){
        const { name, value } = e.target;  
        dispatch(settitle({ [name]: value }));      
    }



  
  return (
    <Stack sx={{ flexDirection: 'row', gap: '10px' ,marginTop:'140px'}}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"  >
        <path d="M16.3256 15.7191C18.3549 14.5476 21.645 14.5476 23.6742 15.7191L36.3256 23.0228C38.3548 24.1942 38.3548 26.0936 36.3256 27.2651L23.6742 34.5687C21.645 35.7402 18.3549 35.7402 16.3256 34.5687L3.6743 27.2651C1.64504 26.0936 1.64504 24.1942 3.6743 23.0228L16.3256 15.7191Z" fill="#E9A23B" fill-opacity="0.2"/>
        <path d="M16.3258 10.5097C18.355 9.33817 21.6451 9.33817 23.6744 10.5097L36.3257 17.8133C38.355 18.9848 38.355 20.8842 36.3257 22.0556L23.6744 29.3593C21.6451 30.5308 18.355 30.5308 16.3258 29.3593L3.67442 22.0556C1.64516 20.8841 1.64516 18.9848 3.67442 17.8133L16.3258 10.5097Z" fill="#E9A23B" fill-opacity="0.5"/>
        <path d="M16.3258 5.12118C18.355 3.94968 21.6451 3.94968 23.6744 5.12118L36.3257 12.4248C38.355 13.5963 38.355 15.4957 36.3257 16.6672L23.6744 23.9708C21.6451 25.1423 18.355 25.1423 16.3258 23.9708L3.67442 16.6671C1.64516 15.4957 1.64516 13.5963 3.67442 12.4248L16.3258 5.12118Z" fill="#E9A23B"/>
    </svg>

    <Stack>  
        {isEditable===true? 
            <>

            <Input 
            variant="plain"
            type="text"
            name="title"
            className="form-control"
            value={theTitle.title}  
            onChange={updateFormValues}
            />
            <Textarea
                variant="plain"
                type="text"
                name="description"
                className="form-control"
                value={theTitle.description}  
                onChange={updateFormValues}
            />
            <Button onClick={handleSave}>Save</Button>

            </>
 
            :

        <>

        <Typography variant="h4" sx={{ textAlign:'start', fontSize: { xs: '1.2rem', sm: '2rem' } }}>
        {theTitle.title}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
        <path d="M13.5 5.5L6.45321 12.5468C6.22845 12.7716 6.11607 12.8839 6.04454 13.0229C5.97301 13.1619 5.94689 13.3187 5.89463 13.6322L5.11508 18.3095C5.06262 18.6243 5.03639 18.7817 5.12736 18.8726C5.21833 18.9636 5.37571 18.9374 5.69048 18.8849L10.3678 18.1054L10.3678 18.1054C10.6813 18.0531 10.8381 18.027 10.9771 17.9555C11.1161 17.8839 11.2284 17.7716 11.4532 17.5468L11.4532 17.5468L18.5 10.5C19.5171 9.48295 20.0256 8.97442 20.1384 8.36277C20.1826 8.12295 20.1826 7.87705 20.1384 7.63723C20.0256 7.02558 19.5171 6.51705 18.5 5.5C17.4829 4.48295 16.9744 3.97442 16.3628 3.8616C16.1229 3.81737 15.8771 3.81737 15.6372 3.8616C15.0256 3.97442 14.5171 4.48294 13.5 5.5Z" fill="#030616" fill-opacity="0.25"/>
        <path d="M12.2929 6.70711L6.45321 12.5468C6.22845 12.7716 6.11607 12.8839 6.04454 13.0229C5.97301 13.1619 5.94689 13.3187 5.89463 13.6322L5.11508 18.3095C5.06262 18.6243 5.03639 18.7817 5.12736 18.8726C5.21833 18.9636 5.37571 18.9374 5.69048 18.8849L10.3678 18.1054L10.3678 18.1054C10.6813 18.0531 10.8381 18.027 10.9771 17.9555C11.1161 17.8839 11.2284 17.7716 11.4532 17.5468L11.4532 17.5468L17.2929 11.7071C17.6262 11.3738 17.7929 11.2071 17.7929 11C17.7929 10.7929 17.6262 10.6262 17.2929 10.2929L17.2929 10.2929L13.7071 6.70711C13.3738 6.37377 13.2071 6.20711 13 6.20711C12.7929 6.20711 12.6262 6.37377 12.2929 6.70711Z" fill="#030616"/>
        </svg>
        </Typography>

        <Typography variant="h6" sx={{textAlign:'start', opacity: 0.7, fontSize: { xs: '0.9rem', sm: '1.2rem' } }}>{theTitle.description}  </Typography>
        </>
    }

    </Stack>


</Stack>
)
}
