import { useState, useEffect } from 'react';
import { Box } from '@mui/material';import './App.css';
import CircleLoader from "react-spinners/CircleLoader";
import Browser from './components/Browser/Browser';
import NavBar from './components/NavBar/NavBar';
import arrow from "./components/resources/arrow.png";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simule un délai de chargement (
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 secondes

    return () => clearTimeout(timer); // Nettoyage du timer
  }, []);

  if (isLoading) {
    // Affiche le loader pendant le chargement
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircleLoader color="#e9a23b" size={100} />
      </Box>
    );
  }

  // Affiche le contenu principal une fois le chargement terminé
  return (
    <Box sx={{ height: { xs: '40vh', md: '90vh' } }}>
      <NavBar />
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          justifyContent: 'end',
          zIndex: -1,
          padding: '20px',
          marginRight: '25px',
        }}
      >
        <img src={arrow} alt="arrow" />
      </Box>
      <Browser />
    </Box>
  );
}

export default App;