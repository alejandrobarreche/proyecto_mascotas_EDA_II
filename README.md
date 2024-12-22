# Sistema de Recomendación de Alimentos para Mascotas

## Descripción del Proyecto
Este proyecto tiene como objetivo proporcionar una experiencia personalizada para la selección y recomendación de alimentos específicos para mascotas, optimizando su salud y bienestar. El sistema está diseñado para seleccionar alimentos ideales para perros y gatos basándose en características como raza, peso, actividad, edad, alergias y enfermedades.

---
## Instrucciones para Ejecutar el Proyecto

### Requisitos
- Tener instalado un navegador web moderno (Chrome, Firefox, Edge, etc.).
- Tener instalado `git` para clonar el repositorio (opcional).

### Pasos para Ejecutar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/alejandrobarreche/proyecto_mascotas_EDA_II
   ```
2. **Abrir el archivo inicial**:
  - Localiza el archivo `dogocat.html` en el directario.
  - Abre el archivo en el navegador.

---

## Características Principales

### 1. Personalización del Proceso
- **Selección de Especie**: Los usuarios eligen entre perro o gato en una interfaz inicial. La selección se almacena en `localStorage` y redirige a formularios específicos.
- **Formulario Dinámico**: Los usuarios completan un formulario adaptado con información de su mascota, incluyendo:
  - Raza, peso, nivel de actividad, edad, alergias y enfermedades.
  - Listas dinámicas de razas extraídas de archivos JSON.
- **Validación y Almacenamiento**: Los datos son validados y almacenados localmente para generar recomendaciones personalizadas.

### 2. Recomendaciones Personalizadas
- **Filtros Inteligentes**: El sistema aplica criterios específicos como:
  - Peso y actividad: Productos que cubren necesidades energéticas.
  - Edad: Filtrando snacks o alimentos específicos para cachorros y adultos mayores.
  - Alergias y enfermedades: Excluyendo productos perjudiciales y priorizando opciones saludables.
- **Visualización Mejorada**: Las recomendaciones se muestran en tarjetas con:
  - Imagen, descripción, precio y opciones interactivas.
- **Almacenamiento**: Las recomendaciones se guardan en `localStorage` para acceso inmediato.

---

## Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript.
- **Backend Simulado**: Archivos JSON para datos de productos y razas.
- **Interactividad**: Uso de `fetch` y `localStorage` para la gestión de datos.


## Estructura de Archivos

```plaintext
/project-root
|-- /src
|   |-- /data
|   |   |-- dog_products.json
|   |   |-- cat_products.json
|   |-- /css
|   |   |-- dogocat.css
|   |   |-- main.css
|   |   |-- recomendaciones_.css
|-- /public
|   |-- /api
|   |   |-- doginfo_translated.json
|   |   |-- catinfo_translated.json
|-- dogocat.html
|-- comida_ideal.html
|-- recomendaciones.html
|-- README.md
```

---

© 2024 - Sistema de Recomendación de Alimentos para Mascotas
