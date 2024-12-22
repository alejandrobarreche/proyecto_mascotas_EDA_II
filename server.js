const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Ruta para guardar los datos del formulario
app.post('/api/saveFormData', (req, res) => {
    const dataPath = path.join(__dirname, '../data/form/informacion_formulario.json');
    const formData = req.body;

    // Guardar los datos en el archivo JSON
    fs.writeFile(dataPath, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).json({ message: 'Error al guardar los datos' });
        }
        res.status(200).json({ message: 'Datos guardados con éxito' });
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
