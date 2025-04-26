const button = document.getElementById('get-pokemon-btn');
const card = document.getElementById('pokemon-card');

let currentId = 1; // empezamos desde el primer Pokémon

const showPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
    const data = await response.json();

    card.innerHTML = `
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <h3>${data.name.toUpperCase()}</h3>
    `;

    currentId++; // para el siguiente Pokémon
    if (currentId > 1010) currentId = 1; // reinicia si llega al final de la Pokédex
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error);
  }
};

button.addEventListener('click', showPokemon);
