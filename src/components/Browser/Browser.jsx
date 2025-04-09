import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CardComponent from '../Card/CardComponent'
import ModalCard from '../ModalCard/ModalCard'
import NavBar from '../NavBar/NavBar'
import Title from '../Title/Title'
export default function Browser({taskList}) {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        height: '100%',  
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // zIndex: {md:1},
        position:'relative',
        top: { xs: -70, sm: '-250px' }
      }}
    >
       <Title />

        <Stack  sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent:'center',
                gap: 2,
                padding: 2,
            }}>
        <ModalCard taskList_={taskList} />       
        </Stack>
    </Box>
  )
}
