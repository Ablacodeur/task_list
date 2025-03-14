import express from "express";
import cors from "cors";
import pkg from "pg";  // Importation par défaut de 'pg'
const { Pool } = pkg;  // Extraction de 'Pool' de l'objet importé

// Charger les variables d'environnement
import dotenv from "dotenv"; 
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Permet de traiter le JSON des requêtes

// Connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task',
  password:'victo',
  port: '5432',
});

// Route pour récupérer les tâches
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasky");
    res.json(result.rows);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});
//post route
app.post("/tasks", async (req, res) => {
  const { id, name, description, status, icon,statusicon} = req.body;

  console.log("Données reçues :", { id, name, description, status, icon,statusicon });

  // Vérification des champs obligatoires
  if (!name || !description ) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Vérifie si la tâche existe déjà
    const existingTask = await pool.query(
      "SELECT * FROM tasky WHERE id = $1",
      [id],
    );

    console.log("Tâche existante :", existingTask.rows);
    
    if (existingTask.rows.length > 0) {
      // Mise à jour de la tâche existante
      const updatedTask = await pool.query(
        `UPDATE tasky 
         SET name = $1, description = $2, status = $3, icon = $4,statusicon =$6
         WHERE id = $5
         RETURNING *`,
        [name, description, status, icon, id,statusicon]
      );

      console.log("Tâche mise à jour :", updatedTask.rows[0]);
      return res.status(200).json(updatedTask.rows[0]);
    } else {
      // Insertion d'une nouvelle tâche
      const newTask = await pool.query(
        `INSERT INTO tasky (name, description, status, icon,statusicon) 
         VALUES ($1, $2, $3, $4,$5) 
         RETURNING *`,
        [name, description, status, icon,statusicon]
      );

      console.log("Nouvelle tâche ajoutée :", newTask.rows[0]);
      return res.status(201).json(newTask.rows[0]);
    }
    } catch (error) {
      console.error("Erreur SQL :", error);
      res.status(500).send("Erreur lors de l'ajout ou de la mise à jour de la tâche.");
    }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasky WHERE id = $1', [id]);
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
  }
});



// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
