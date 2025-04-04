import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pkg from "pg"; 
const { Pool } = pkg; 

const app = express();

// Configuration CORS : permet d'autoriser le frontend de Vercel à se connecter
const corsOptions = {
  origin: 'https://task-list-inky.vercel.app/', 
  methods: 'GET,POST,DELETE',
};
app.use(cors(corsOptions));

app.use(express.json()); // Permet de traiter le JSON des requêtes

// Connexion à PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Route pour récupérer toutes les tâches
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasky");
    res.json(result.rows);    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la récupération des tâches");
  }
});

// Route pour ajouter ou mettre à jour une tâche
app.post("/tasks", async (req, res) => {
  const { id, name, description, status, icon, statusicon } = req.body;

  console.log("Données reçues :", { id, name, description, status, icon, statusicon });

  // Vérification des champs obligatoires
  if (!name || !description) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Vérifie si la tâche existe déjà
    const existingTask = await pool.query("SELECT * FROM tasky WHERE id = $1", [id]);

    if (existingTask.rows.length > 0) {
      // Mise à jour de la tâche existante
      const updatedTask = await pool.query(
        `UPDATE tasky 
         SET name = $1, description = $2, status = $3, icon = $4, statusicon = $5
         WHERE id = $6
         RETURNING *`,
        [name, description, status, icon, statusicon, id]
      );
      return res.status(200).json(updatedTask.rows[0]);
    } else {
      // Insertion d'une nouvelle tâche
      const newTask = await pool.query(
        `INSERT INTO tasky (name, description, status, icon, statusicon) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, description, status, icon, statusicon]
      );
      return res.status(201).json(newTask.rows[0]);
    }
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).send("Erreur lors de l'ajout ou de la mise à jour de la tâche.");
  }
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResult = await pool.query('DELETE FROM tasky WHERE id = $1', [id]);
    if (deleteResult.rowCount === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;  // Assure-toi que le port est bien défini dans les variables d'environnement
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
