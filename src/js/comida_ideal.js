// Leer la selección desde localStorage
const species = localStorage.getItem('species');

// Actualizar el texto identificativo en la página
const speciesDisplay = document.getElementById('species-display');



// MUESTRA LA ESPECIE SELECCIONADA TRAS ELEGIRLA CON UN BOTON

if (species === 'perro') {
    speciesDisplay.textContent = 'Háblanos de tu perro 🐶';
} else if (species === 'gato') {
    speciesDisplay.textContent = 'Háblanos de tu gato 🐱';
} else {
    speciesDisplay.textContent = 'No se seleccionó ninguna especie.';
}



// Referencia al datalist de razas
const breedList = document.getElementById('breed-list');

// Función para cargar las razas de un archivo JSON local
async function loadBreeds() {
    try {
        console.log('Iniciando carga de razas...');
        let breeds = [];
        if (species === 'perro') {
            const response_dog = await fetch('../../public/api/breeds/doginfo_translated.json');
            console.log('Respuesta de perros:', response_dog);
            breeds = await response_dog.json();
        } else if (species === 'gato') {
            console.log('Cargando razas de gatos...');
            const response_cat = await fetch('../../public/api/breeds/catinfo_translated.json');
            console.log('Respuesta de gatos:', response_cat);
            breeds = await response_cat.json();
        } else {
            console.error('Especie no definida correctamente:', species);
            breedList.innerHTML = '<option value="">Selecciona una especie primero</option>';
            return;
        }


        // Poblar las opciones del datalist con las razas obtenidas
        breedList.innerHTML = breeds.map(breed => {
            const breedName = typeof breed === 'string' ? breed : breed.name;
            return `<option value="${breedName}">`;
        }).join('');
        console.log('Opciones del datalist actualizadas.');
    } catch (error) {
        console.error('Error al cargar las razas:', error);
        breedList.innerHTML = '<option value="">No se pudieron cargar las razas</option>';
    }
}

// Cargar las razas al cargar la página
loadBreeds();


// Validar que se haya seleccionado una especie antes de enviar el formulario
const form = document.getElementById('mascotaForm');
form.addEventListener('submit', (event) => {
    if (!species) {
        event.preventDefault(); // Detener el envío
        alert('Por favor, selecciona una especie antes de enviar el formulario.');
    }
});


// Obtener los elementos del deslizador y la etiqueta de nivel
// Referencias al deslizador y etiqueta
const activitySlider = document.getElementById('activity');
const activityLabel = document.getElementById('activity-label');

// Función para actualizar el texto y el color dinámicamente
const updateActivityLevel = (value) => {
    let levelText = '';

    // Determinar el texto del nivel
    if (value < 5) {
        levelText = `Baja (${value})`;
    } else if (value >= 5 && value <= 7) {
        levelText = `Moderada (${value})`;
    } else {
        levelText = `Alta: (${value})`;
    }

    // Actualizar el texto del nivel
    activityLabel.textContent = levelText;

    // Actualizar el color del fondo del deslizador
};



// Escuchar los cambios en el deslizador
activitySlider.addEventListener('input', () => {
    updateActivityLevel(activitySlider.value);
});

// Inicializar con el valor predeterminado
updateActivityLevel(activitySlider.value);

