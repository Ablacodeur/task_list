import { Box } from '@mui/material'
import './App.css'
import Browser from './components/Browser/Browser'
import NavBar from './components/NavBar/NavBar'
import arrow from "./components/resources/arrow.png"
function App() {

  return (
    <>
    <NavBar/>
    <Box sx={{ 
        display:'flex',
        justifyContent:'end',
        zIndex: -1,
        padding:'20px',
        marginRight:'25px'

     }}>
    <img src={arrow} ></img>
    </Box>
    <Browser />
    </>
  )
}

export default App
