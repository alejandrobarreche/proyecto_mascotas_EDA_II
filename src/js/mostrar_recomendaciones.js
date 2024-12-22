function toggleDetails(button) {
    const details = button.nextElementSibling; // Selecciona el contenedor de detalles
    if (details.style.display === "block") {
        details.style.display = "none";
        button.textContent = "Ver más detalles";
    } else {
        details.style.display = "block";
        button.textContent = "Ver menos detalles";
    }
}

// Simulación: Generar dinámicamente las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

    if (!recommendations.length) {
        productList.innerHTML = "<p>No se encontraron productos recomendados.</p>";
        return;
    }

    recommendations.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image?.src || 'default.jpg'}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">Precio: $${product.variants[0]?.price || 'N/A'}</p>
            <button class="btn" onclick="toggleDetails(this)">Ver más detalles</button>
            <div class="details">
                <p>${product.body_html || 'No hay detalles disponibles.'}</p>
            </div>
        `;
        productList.appendChild(card);
    });
});
