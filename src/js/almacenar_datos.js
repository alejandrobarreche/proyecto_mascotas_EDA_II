
document.getElementById('mascotaForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar envío por defecto

    const species_selected = localStorage.getItem('species');
    const formData = new FormData(event.target);

    // Validación de los datos del formulario
    function validateFormData(formData) {
        if (!formData.get('breed')) return 'Por favor, selecciona una raza.';
        if (!formData.get('weight') || parseFloat(formData.get('weight')) <= 0) return 'Por favor, ingresa un peso válido.';
        if (!formData.get('activity')) return 'Por favor, selecciona un nivel de actividad.';
        if (!formData.get('age') || parseInt(formData.get('age'), 10) < 0) return 'Por favor, ingresa una edad válida.';
        return null;
    }

    // Formatear lista de strings
    function formatList(input) {
        if (!input) return [];
        return input.split(',')
            .map(item => item.trim()) // Eliminar espacios en blanco
            .filter(item => item) // Quitar elementos vacíos
            .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()); // Capitalizar
    }

    const errorMessage = validateFormData(formData);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const petData = {
        species: species_selected || 'No especificada',
        breed: formData.get('breed'),
        weight: parseFloat(formData.get('weight')),
        activity: parseInt(formData.get('activity')),
        age: parseInt(formData.get('age')),
        allergies: formatList(formData.get('allergies') || ''), // Formatear alergias
        diseases: formatList(formData.get('diseases') || '')   // Formatear enfermedades
    };

    // Guardar en localStorage
    localStorage.setItem('petData', JSON.stringify(petData));


    async function loadData() {
        try {
            // Cargar productos
            const dogProductsResponse = await fetch('/src/data/products/dog_products.json');
            const catProductsResponse = await fetch('/src/data/products/cat_products.json');
            const dogProducts = await dogProductsResponse.json();
            const catProducts = await catProductsResponse.json();

            // Cargar razas
            const dogBreedsResponse = await fetch('/public/api/breeds/doginfo_translated.json');
            const catBreedsResponse = await fetch('/public/api/breeds/catinfo_translated.json');
            const dogBreeds = await dogBreedsResponse.json();
            const catBreeds = await catBreedsResponse.json();

            // Guardar en localStorage
            localStorage.setItem('dogProducts', JSON.stringify(dogProducts));
            localStorage.setItem('catProducts', JSON.stringify(catProducts));
            localStorage.setItem('dogBreeds', JSON.stringify(dogBreeds));
            localStorage.setItem('catBreeds', JSON.stringify(catBreeds));

            console.log('Datos cargados y almacenados con éxito.');
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    }

    async function main() {
        await loadData();

        const {species, breed, weight, activity, age, allergies = [], diseases = []} = petData;
        const productsKey = species_selected.toLowerCase() === "perro" ? 'dogProducts' : 'catProducts';
        const products = JSON.parse(localStorage.getItem(productsKey)) || [];

        const applyFilter = (products, filterFunction, ...args) => {
            const filtered = filterFunction(products, ...args);
            return filtered.length > 0 ? filtered : products;
        };

        const parseWeightFromTitle = (title) => {
            const weightRegex = /(\d+(?:\.\d+)?)\s*(gr|kg)/i;
            const match = title.match(weightRegex);
            if (!match) return null;

            const [_, value, unit] = match;
            const weightInGrams = unit.toLowerCase() === 'kg' ? parseFloat(value) * 1000 : parseFloat(value);
            return weightInGrams;
        };

        const filterProductsByWeightAndActivity = (products, weight, activity) => {
            const requiredWeight = 3 * weight * activity; // Peso requerido en gramos

            return products.filter(product => {
                return product.variants.some(variant => {
                    const variantWeight = parseWeightFromTitle(variant.title);
                    return variantWeight !== null && requiredWeight <= variantWeight;
                });
            });
        };

        const excludeSnacksForSeniorDogs = (products, age) => {
            if (age <= 9) return products;
            return products.filter(product => product.product_type.toLowerCase() !== 'snacks para perros');
        };

        const excludeGiftProducts = (products) => {
            return products.filter(product => product.product_type.toLowerCase() !== 'gift');
        };

        const getTemperament = (breedName, species) => {
            const breeds = species.toLowerCase() === 'perro' ? JSON.parse(localStorage.getItem('dogBreeds')) : JSON.parse(localStorage.getItem('catBreeds'));
            const breedInfo = breeds.find(b => b.name.toLowerCase() === breedName.toLowerCase());
            return breedInfo ? breedInfo.temperament.split(',').map(t => t.trim().toLowerCase()) : [];
        };

        const filterProductsByTemperament = (products, temperaments) => {
            return products.filter(product => {
                const bodyHtml = product.body_html?.toLowerCase() || "";
                return temperaments.some(temp => bodyHtml.includes(temp));
            });
        };

        const filterProductsByAllergies = (products, allergies) => {
            return products.filter(product => {
                const productTags = product.tags?.toLowerCase() || "";
                return !allergies.some(allergy => productTags.includes(allergy.toLowerCase()));
            });
        };

        const requireColdTransportForDiseases = (products, diseases) => {
            if (diseases.length === 0) return products;
            return products.filter(product => product.tags?.includes("REQUIERE"));
        };

        const requireSpecificKeywordsForDiseases = (products, diseases) => {
            if (diseases.length === 0) return products;
            const keywords = ["inmu", "salud", "vitamina"];
            return products.filter(product => {
                const bodyHtml = product.body_html?.toLowerCase() || "";
                return keywords.some(keyword => bodyHtml.includes(keyword));
            });
        };

        const filterProductsByAgeKeywords = (products, age) => {
            const youngKeywords = ["crecimiento", "desarrollo", "cachorro", "puppy", "refuerzo inmunitario", "energía alta"];
            const seniorKeywords = ["senior", "edad avanzada", "articulaciones", "movilidad", "condroprotector", "digestión suave", "salud articular"];

            if (age < 2) {
                return products.filter(product => {
                    const bodyHtml = product.body_html?.toLowerCase() || "";
                    return youngKeywords.some(keyword => bodyHtml.includes(keyword));
                });
            } else if (age > 7) {
                return products.filter(product => {
                    const bodyHtml = product.body_html?.toLowerCase() || "";
                    return seniorKeywords.some(keyword => bodyHtml.includes(keyword));
                });
            }
            return products; // Sin filtro para edades intermedias
        };

        const filterProductsByActivityKeywords = (products, activity) => {
            const highActivityKeywords = ["deporte", "actividad alta", "energía alta", "resistencia", "perros activos", "músculo", "entrenamiento"];
            const lowActivityKeywords = ["bajo en calorías", "control de peso", "light", "poco activo", "descanso"];

            if (activity >= 8) {
                return products.filter(product => {
                    const bodyHtml = product.body_html?.toLowerCase() || "";
                    return highActivityKeywords.some(keyword => bodyHtml.includes(keyword));
                });
            } else if (activity <= 3) {
                return products.filter(product => {
                    const bodyHtml = product.body_html?.toLowerCase() || "";
                    return lowActivityKeywords.some(keyword => bodyHtml.includes(keyword));
                });
            }
            return products; // Sin filtro para niveles de actividad intermedios
        };

        const temperaments = getTemperament(breed, species);

        let filteredProducts = applyFilter(products, excludeGiftProducts); // Excluir productos de tipo "gift"
        filteredProducts = applyFilter(filteredProducts, filterProductsByAllergies, allergies); // Filtrar por alergias
        filteredProducts = applyFilter(filteredProducts, requireColdTransportForDiseases, diseases); // Filtrar por "REQUIERE TRANSPORTE FRIO" si hay enfermedades
        filteredProducts = applyFilter(filteredProducts, requireSpecificKeywordsForDiseases, diseases); // Filtrar por palabras clave en el body_html si hay enfermedades
        filteredProducts = applyFilter(filteredProducts, excludeSnacksForSeniorDogs, age); // Excluir snacks si la edad es mayor de 9 años
        filteredProducts = applyFilter(filteredProducts, filterProductsByWeightAndActivity, weight, activity); // Filtrar por peso y actividad
        filteredProducts = applyFilter(filteredProducts, filterProductsByActivityKeywords, activity); // Filtrar por palabras clave relacionadas con el nivel de actividad
        filteredProducts = applyFilter(filteredProducts, filterProductsByAgeKeywords, age); // Filtrar por palabras clave relacionadas con la edad

        localStorage.setItem('recommendations', JSON.stringify(filteredProducts));
        alert('Recomendaciones generadas y guardadas con éxito!');
    }

    await main();
});





