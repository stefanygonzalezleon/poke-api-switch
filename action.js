const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeHeight = document.querySelector('[data-poke-height]');
const pokeWeight = document.querySelector('[data-poke-weight]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');
const formToggle = document.getElementById("form-Toggle");
const formSection = document.getElementById("form-section");
const informationSection = document.getElementById("informationSection");
const button = document.createElement("button");

button.innerHTML = "‹";

//seccion form 
function toggle() {
    var form = document.getElementById('form');
    if (form.style.display == 'block') {
        form.style.display = 'none';


    }
    else {
        form.style.display = 'block';

    }
}

function buscarPokemon(event) {
    formSection.style.display = "none";
    informationSection.style.visibility = "visible";
    formToggle.appendChild(button);
    button.style.display = 'block';

    event.preventDefault();
    //api fetch
    const value = event.target.pokemon.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => PokemonData(response))
        .catch(err => renderNotFound())
    event.target.reset();
}

//mostrar stats
function toggleStats() {
    let stats = document.getElementById("stats");
    stats.style.visibility = stats.style.visibility == 'hidden' ? 'visible' : 'hidden';
}

// promesa response
function PokemonData(data) {
    const sprite = data.sprites.front_default;
    const { stats, types, height, weight, moves} = data;
    pokeName.textContent = data.name;
    pokeHeight.textContent = data.height;
    pokeWeight.textContent = data.weight;
    pokeImg.setAttribute('src', sprite);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
}

function renderPokemonTypes(types) {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}


function renderPokemonStats(stats) {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}


function renderPokemonMoves(moves) {
    pokeMoves.innerHTML = '';
    moves.forEach(move => {
        const movesTextElement = document.createElement("div");
        movesTextElement.textContent = move.move.name;
        pokeMoves.appendChild(movesTextElement);
    });
}

pokeMoves.innerHTML += pokeMoves.innerHTML;

function toggleMoves() {
    let moves= document.getElementById("movesMain");
    moves.style.visibility = moves.style.visibility == 'hidden' ? 'visible' : 'hidden';
}

// boton atras
button.onclick = function () {
    formSection.style.display = "block";
    button.style.display = 'none';
    informationSection.style.visibility = "hidden";

};

//promesa error
const renderNotFound = () => {
    pokeName.textContent = 'no encontrado';
    pokeImg.setAttribute('src', 'img/ash.png');
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeHeight.textContent = '';
    pokeWeight.textContent = '';
    pokeMoves.textContent = '';
    formSection.style.display = "block";
    informationSection.style.visibility = "hidden";
    button.style.display = 'none';
}