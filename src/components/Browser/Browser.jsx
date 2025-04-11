import { Box, Stack } from '@mui/material';
import React from 'react';
import ModalCard from '../ModalCard/ModalCard';
import Title from '../Title/Title';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Browser({ taskList }) {
  // Fonction pour afficher les notifications
  const notify = (type) => {
    if (type === 'add') {
      toast.success('Tâche ajoutée avec succès !', {
       position: 'top-center',
        autoClose: 3000, // Ferme automatiquement après 3 secondes
      });
    } else if (type === 'delete') {
      toast.error('Tâche supprimée avec succès !', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {/* Conteneur pour les notifications */}
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          height: '100%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          top: { xs: '-140px', sm: '-280px' },
          height: '90vh',
        }}
      >
        <Title />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
          }}
        >
          {/* Passe la fonction notify à ModalCard */}
          <ModalCard
            taskList_={taskList}
            setGlobalAlert={(alertType) => notify(alertType)}
          />
        </Stack>
      </Box>
    </>
  );
}