import { Stack } from '@mui/joy'
import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchByStatus from '../SearchByStatus/SearchByStatus'
import { SearchBar } from '../SearchBar/SearchBar'
import { useDispatch } from 'react-redux'
import { settheSearch } from '../../store/task/userSearch-slice'

export default function NavBar() {
  const [searchText, setSearchText]=useState();
  const dispatch =  useDispatch();

  function handleChange(e){
    setSearchText(e.target.value)
    dispatch(settheSearch(e.target.value))
  };
  console.log(searchText);


  return (
    <Box>
        <Stack sx={{ 
            flexDirection:'row',
            justifyContent:'end',
            gap:'10px'
         }}>
         <SearchBar onTextChange={handleChange}/>
        <SearchByStatus />
        </Stack>
    </Box>

  )
}
