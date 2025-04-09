import { Stack } from '@mui/joy'
import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function CardComponent({ task }) {
  return (
    <Card
      variant="none"
      sx={{
        width: '100%',
        height: {xs:'35px', md:'65px'},
        borderRadius: '10px',
        backgroundColor: 
            task.status === 'In Progress' ? '#F5D565' : 
            task.status === 'Completed' ? '#A0ECB1' : 
            task.status === "Won't do" ? '#F7D4D3' : 
            '#E3E8EF',
        padding: '3px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* 📌 ICON PRINCIPAL */}
      <Stack>
        <Box
          sx={{
            width: '40px',
            height: '40px',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px'
          }}
        >
          {task.icon && <img src={task.icon} alt="icon" style={{ maxWidth: '60%', maxHeight: '60%' }} />}
        </Box>
      </Stack>

      {/* 📌 CONTENU TEXTE */}
      <Stack sx={{ textAlign: 'start', flex: 1, marginLeft: '8px' }}>
        <CardContent sx={{ padding: '20px' }}>
          <Typography 
          variant="h6" 
          sx={{ fontSize: '1rem', 
          fontWeight: 'bold',
            overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical'
           }}
          
          >
            {task.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {task.description}
          </Typography>

        </CardContent>
      </Stack>

      {/* 📌 ICON STATUS */}
      <Stack>
        <Box
          sx={{
            width: '40px',
            height: '40px',
            // backgroundColor: '#F8FAFC',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px'
          }}
        >
          {task.statusicon && <img src={task.statusicon} alt="icon" style={{ maxWidth: '60%', maxHeight: '60%' }} />}
          </Box>
      </Stack>
    </Card>
  )
}
