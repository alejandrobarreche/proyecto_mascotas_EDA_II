

// Maneja la selección de "Perro"
document.getElementById('dog-button').addEventListener('click', () => {
    localStorage.setItem('species', 'perro');
    globalThis.location.href = 'comida_ideal.html';
});

// Maneja la selección de "Gato"
document.getElementById('cat-button').addEventListener('click', () => {
    localStorage.setItem('species', 'gato');
    globalThis.location.href = 'comida_ideal.html';
});
