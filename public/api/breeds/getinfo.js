const fs = require('fs');
const axios = require('axios');

// Función para obtener razas de perros y guardarlas en un archivo
async function fetchDogBreeds() {
    try {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
            headers: { 'x-api-key': 'TU_API_KEY_AQUÍ' } // Solo si necesitas autenticación
        });

        const dogBreeds = response.data.map(breed => ({ id: breed.id, name: breed.name, temperament: breed.temperament }));

        // Guardar datos en un archivo JSON
        fs.writeFileSync('doginfo_translated.json', JSON.stringify(dogBreeds, null, 2));
        console.log('Archivo dogBreeds.json creado correctamente.');
    } catch (error) {
        console.error('Error al obtener las razas de perros:', error);
    }
}

// Función para obtener razas de gatos y guardarlas en un archivo
async function fetchCatBreeds() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
            headers: { 'x-api-key': 'TU_API_KEY_AQUÍ' } // Solo si necesitas autenticación
        });

        const catBreeds = response.data.map(breed => ({ id: breed.id, name: breed.name, temperament: breed.temperament }));

        // Guardar datos en un archivo JSON
        fs.writeFileSync('catinfo_translated.json', JSON.stringify(catBreeds, null, 2));
        console.log('Archivo catBreeds.json creado correctamente.');
    } catch (error) {
        console.error('Error al obtener las razas de gatos:', error);
    }
}

// Llamar a las funciones
fetchDogBreeds();
fetchCatBreeds();
