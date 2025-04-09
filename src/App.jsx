import { Box } from '@mui/material'
import './App.css'
import Browser from './components/Browser/Browser'
import NavBar from './components/NavBar/NavBar'
import arrow from "./components/resources/arrow.png"
function App() {

  return (
    <Box sx={{ 
        height:{xs:'40vh',md:'90vh'}
     }}>
    <NavBar/>
    <Box sx={{ 
        display: { xs: 'none', sm: 'flex' },       
        justifyContent:'end',
        zIndex: -1, 
        padding:'20px',
        marginRight:'25px'

     }}>
    <img src={arrow} alt="arrow" ></img>
    </Box>
    <Browser />
    </Box>
  )
}

export default App
