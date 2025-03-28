import { Stack } from '@mui/joy'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import SearchByStatus from '../SearchByStatus/SearchByStatus'
import { SearchBar } from '../SearchBar/SearchBar'
import { useDispatch } from 'react-redux'
import { settheSearch } from '../../store/task/userSearch-slice'

export default function NavBar() {
  const [searchText, setSearchText] = useState();
  const dispatch = useDispatch();

  function handleChange(e) {
    setSearchText(e.target.value);
    dispatch(settheSearch(e.target.value));
  }
  console.log(searchText);
  
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'end' },
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          gap: '30px',
        }}
      >
      <Box sx={{ zIndex:'3', width: { xs: '100%', sm: 'auto',display:'flex',justifyContent:'center' } }}>
        <SearchBar onTextChange={handleChange} />
        </Box>
        <Box sx={{ zIndex:'3', width: { xs: '100%', sm: 'auto',display:'flex',justifyContent:'end' } }}> 
          <SearchByStatus onTextChange={handleChange} />
        </Box>
      </Stack>
    </Box>
  );
}
