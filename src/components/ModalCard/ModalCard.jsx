import React, { useEffect } from 'react';
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { Box, Checkbox,Typography } from "@mui/material";
import CardComponent from "../Card/CardComponent";
import { Grid, Textarea } from "@mui/joy";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

// import { useNavigate } from 'react-router-dom';





export default function ModalCard() {
  const [open, setOpen] = React.useState(false);
  const [theTask, setTheTask]= React.useState({});
  const [tasks, setTasks]= React.useState([]);
  const [statusName,setStatusName]= React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 4;

  // Calculer les tâches à afficher en fonction de la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTasks = tasks.slice(startIndex, endIndex);


    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        setTasks(response.data); // Réponse contient les données dans `data`
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  
    function handleClick(task){
    setOpen(true);
    if(task){
      console.log(task);
      setTheTask(task)
      
    }}
    function statusClick(event) {
      console.log(event.target.value);
      const clickedStatus = event.currentTarget.getAttribute('name'); 
      const statusIcon = event.currentTarget.querySelector('img')?.src;
          console.log(statusIcon);
      
      console.log("Clicked status:", clickedStatus);
    
      if (clickedStatus) {
        setSelectedStatus(clickedStatus);
        setStatusName(clickedStatus);
        setTheTask((prevTask) => ({
          ...prevTask,
          status: clickedStatus ,// Remplace [name] par 'status' pour cibler directement la clé 'status'
          statusicon:statusIcon
        }));
      }

    }
    
    function iconClick(e){
      const chosenIcon = e.currentTarget.querySelector('img')?.src;
      console.log(chosenIcon);
      
      setTheTask((prevTask) => ({
        ...prevTask,
        icon: chosenIcon 

    }))};

    function setChange(e) {
      const { name, value } = e.target;
    
      setTheTask((prevTask) => ({
        ...prevTask,
        [name]: value, // Met à jour dynamiquement la clé correspondante
      }));
    
      console.log(`Updated ${name}:`, value);
    }

    async function handleDelete(taskId) {
      if(window.confirm("Do you really want to delete the task?")){

      try {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        setTasks((previousTasks) => {
          // Utilisation de la méthode .filter() pour créer un nouveau tableau
          const updatedTasks = previousTasks.filter((task) => {
              // On conserve uniquement les tâches dont l'ID est différent de taskId
              return task.id !== taskId;
          });
      
          // Mise à jour de l'état avec le nouveau tableau filtré
          return updatedTasks;
      });
        setOpen(false); // Ferme la modale après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la tâche :", error);
      }
    }
  }

        
    // Utilisation de useEffect pour surveiller les changements de selectedStatus
    React.useEffect(() => {
      if (selectedStatus) {
        console.log("Updated selectedStatus:", selectedStatus);
      }
    }, [selectedStatus]); // Se déclenche à chaque changement de selectedStatus


    
  React.useEffect(() => {
    // Supprime le flou en modifiant les styles injectés par MUI
    const styles = document.createElement("style");
    styles.innerHTML = `
      .MuiModal-backdrop {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background-color: rgba(0, 0, 0, 0.3) !important;
      }
    `;
    document.head.appendChild(styles);
  }, []);
  
  React.useEffect(() => {
    console.log("Updated selectedStatus:", selectedStatus);
  }, [selectedStatus]);

  return (
    <React.Fragment>
      {currentTasks.map((task,id)=>( 
      
      <Button
        variant="outlined"
        color="neutral"
        // startDecorator={<Add />}
        onClick={()=>handleClick(task)}
        sx={{ 
          backgroundColor: 
            task.status === 'In Progress' ? '#F5D565' : 
            task.status === 'Completed' ? '#A0ECB1' : 
            task.status === "Won't do" ? '#F7D4D3' : 
            '#E3E8EF',
          width: '600px' 
        }}
     
              
              >
      <CardComponent key={id} task={task} />    
    </Button>
    
    ))}
    <Button 
                variant="outlined"
                color='neutral'
                onClick={() => {
                      setTheTask({}); // Réinitialisation ici
                      setOpen(true);
                  }}
                
                sx={{ 
                  display: 'flex', 
                  height:'85px', 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  backgroundColor:'#F5E8D5',
                  justifyContent: 'flex-start',
                  padding: '2px 15px', 
                  gap: '8px',  
                  color:'black'                                
                }} >
              <Box sx={{ 
                  width:'42px', 
                    height:'42px', 
                    backgroundColor:'#E9A23B',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:'5px',
                    
                  
                    }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" fill="#F8FAFC" fill-opacity="0.25"/>
                <path d="M12 8L12 16" stroke="#F8FAFC" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M16 12L8 12" stroke="#F8FAFC" stroke-width="1.2" stroke-linecap="round"/>
                </svg>

                </Box>
                <Typography variant="" x={{ fontSize: '1.5rem', fontWeight: 'bold' }}> Add new task</Typography>

              </Button>           


              <Pagination
      count={Math.ceil(tasks.length / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
    />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ 
          display: "flex", 
          justifyContent: "flex-end",  // Pousse le modal à droite
          alignItems: "center"  // Centre verticalement
        }}
      >
        <ModalDialog
          sx={{
            backgroundColor: "white", // Fond du modal
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "lg",
            overflow: "auto", // Évite les bugs de style
            width:'600px',
            marginLeft:'27.5%',
          }}
        >
        {/* En-tête avec "Task details" et bouton "Close" */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <DialogTitle>Task details</DialogTitle>
            <Button 
              variant="plain" 
              onClick={() => setOpen(false)} 
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              {/* Icône "Close" SVG */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 7.5L12.5 12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12.5 7.5L7.5 12.5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Button>
          </Box>

            <form
              onSubmit={async (e) => {
                e.preventDefault(); // Empêche le rafraîchissement de la page

                try {
                  const response = await axios.post('http://localhost:5000/tasks', theTask);
                  console.log('Tâche soumise avec succès :', response.data);
                  setOpen(false); // Ferme la modale ou le formulaire après la réussite de la requête

                  // Rafraîchit la liste des tâches après la soumission
                  const updatedTasksResponse = await axios.get("http://localhost:5000/");
                  setTasks(updatedTasksResponse.data); // Met à jour les tâches
                } catch (error) {
                  console.error('Erreur lors de la soumission :', error);
                  setOpen(false); // Ferme la modale ou le formulaire après la réussite de la requête
                }
              }}
            >
            <Stack spacing={2}>
              <FormControl> 
                <FormLabel sx={{ color:'GrayText'}}>Task name</FormLabel>
                <Input
                autoFocus
                required
                name='name'
                onChange={setChange}                
                value={theTask.name || ''} // Affiche le nom de la tâche ou une chaîne vide
              />             
              </FormControl>
              <FormControl>
                <FormLabel sx={{ color:'GrayText'}} >Description</FormLabel>
                <Textarea 
                required 
                name='description'
                onChange={setChange}                
                placeholder="Enter a short description" 
                minRows={10} 
                value={theTask.description || " "}

                />
              </FormControl>


            </Stack>
            <Typography sx={{ color:'GrayText', fontSize:'14px'}}>Icon</Typography>
            <Stack sx={{ flexDirection:'row', gap:'5px' }}>
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/technologyst.png" alt="technologyst"/> </Button>           
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/speech-balloon.png" alt="speech-balloon"/></Button> 
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/hot-beverage.png" alt="hot-beverage"/></Button>
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/person-lifting-weights.png" alt="person-lifting-weights"/></Button>
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/books-emoji.png" alt="books-emoji"/></Button>
              <Button onClick={iconClick} sx={{ backgroundColor:'#E3E8EF'}}><img  width="20" height="20" src="https://img.icons8.com/emoji/48/alarm-clock-emoji.png" alt="alarm-clock-emoji"/></Button>
            </Stack>

            <Typography sx={{ color:'GrayText', fontSize:'14px'}}>Status</Typography>
            <Grid 
              container
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', // Trois colonnes de taille égale
                gap: '5px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button 
                color='neutral'
                variant="outlined"
                onClick={statusClick}
                name ="In Progress"

                sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '2px 2px', 
                  gap: '8px',
                  outline: statusName === "In Progress" || theTask.status === "In Progress" ? '3px solid blue' : 'none', 
                  '&:focus': {
                    outline: '3px solid blue', }
                                  
                }} >
              <Box sx={{ 
                  width:'40px', 
                    height:'40px', 
                    backgroundColor:'#E9A23B',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:'5px',
                    
                  
                    }}>
                    <img width="20" onClick={statusClick} height="20" src="https://img.icons8.com/badges/48/slice.png" alt="slice"/>
                </Box>
                <Typography>In Progress</Typography>
                {selectedStatus && statusName === "In Progress"  || theTask.status === "In Progress"? <Checkbox defaultChecked /> : ""}

              </Button>           

              <Button
                color='neutral'
                variant="outlined"
                name="Completed"
                onClick={statusClick}
                tabIndex={0}

                sx={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '2px 2px', 
                  variant:'neutral',
                  gap: '8px' ,// Espacement entre Box et le texte
                  outline: statusName === "Completed" || theTask.status  === "Completed"? '3px solid blue' : 'none', 
                  '&:focus': {
                    outline: '3px solid blue', }
                                  

                }}>
              <Box 
                color='neutral'
                variant="outlined"
                
                sx={{ 
                    width:'40px', 
                      height:'40px', 
                      backgroundColor:'#32D657',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius:'5px',
                    
                      }}>                  
                      <img width="20" height="20" src="https://img.icons8.com/doodle/48/ok.png" alt="ok"/>
                       </Box>
                    <Typography>Completed </Typography>
                    {selectedStatus && statusName === "Completed"  || theTask.status  === "Completed"? <Checkbox defaultChecked />: ""}

              </Button>           

              <Button 
                color='neutral'
                variant="outlined"
                onClick={statusClick}
                name = "Won't do"
                sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '2px 2px', 
                gap: '8px', // Espacement entre Box et le texte
                outline: statusName  === "Won't do" || theTask.status==="Won't do" ? '3px solid blue' : 'none', 
                  '&:focus': {
                    outline: '3px solid blue', }
                                  

              }}>
              <Box sx={{ 
                  width:'40px', 
                    height:'40px', 
                    backgroundColor:'#DD524C',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:'5px',
                  
                    }}><img width="20" height="20" src="https://img.icons8.com/pulsar-gradient/48/cancel.png" alt="cancel"/>
                </Box>
                <Typography>Won't do</Typography>
                {selectedStatus &&statusName === "Won't do" || theTask.status==="Won't do"?<Checkbox defaultChecked />: ""}
              </Button> 

                </Grid>
                <Stack sx={{ flexDirection:'row',  justifyContent:'flex-end', marginTop:'80px', gap:'5px' }}>
                <Button 
                onClick={() => handleDelete(theTask.id)}
                sx={{ width:"30%",  borderRadius:'50px', backgroundColor:'#97A3B6',gap:'5px' }} >Delete
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33333 12.5L8.33333 10" stroke="#FEF7EE" stroke-width="2" stroke-linecap="round"/>
                <path d="M11.6667 12.5L11.6667 10" stroke="#FEF7EE" stroke-width="2" stroke-linecap="round"/>
                <path d="M2.5 5.83331H17.5V5.83331C17.0353 5.83331 16.803 5.83331 16.6098 5.87174C15.8164 6.02956 15.1962 6.64975 15.0384 7.44313C15 7.63633 15 7.86866 15 8.33331V12.6666C15 14.5523 15 15.4951 14.4142 16.0809C13.8284 16.6666 12.8856 16.6666 11 16.6666H9C7.11438 16.6666 6.17157 16.6666 5.58579 16.0809C5 15.4951 5 14.5523 5 12.6666V8.33331C5 7.86866 5 7.63633 4.96157 7.44313C4.80376 6.64975 4.18356 6.02956 3.39018 5.87174C3.19698 5.83331 2.96466 5.83331 2.5 5.83331V5.83331Z" stroke="#FEF7EE" stroke-width="2" stroke-linecap="round"/>
                <path d="M8.39013 2.80883C8.48509 2.72023 8.69433 2.64194 8.9854 2.5861C9.27648 2.53027 9.63311 2.5 10 2.5C10.3669 2.5 10.7235 2.53027 11.0146 2.5861C11.3057 2.64194 11.5149 2.72023 11.6099 2.80883" stroke="#FEF7EE" stroke-width="2" stroke-linecap="round"/>
                </svg>

                </Button>
                <Button type="submit" sx={{ width:"30%",  borderRadius:'50px', backgroundColor:'#97A3B6',gap:'5px' }}>Submit
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16667 11.6667L6.73309 13.5915C7.16178 13.913 7.76772 13.8395 8.10705 13.4247L15 5" stroke="#FEF7EE" stroke-width="2" stroke-linecap="round"/>
                </svg>

                </Button>



                </Stack>

          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
