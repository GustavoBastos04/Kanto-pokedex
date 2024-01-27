
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxPokemons = 151
const limit = 8
let offset = 0

function loadPokemonItems(offset, limit){
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        // '(pokemon) =>' is a function itself with 'pokemon' as parameter, returns a string 
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail"> 
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>   

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            </li>
            `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit) // First 

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdPokemon = offset + limit

    if(qtdPokemon >= maxPokemons) {
        const newLimit = maxPokemons - offset
        loadPokemonItems(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }

    
})