let pokemonRepository = ( function () {

   let pokemonList = [
      {
         name: 'Bulbasaur', 
         height: 2.4, 
         types: ['grass', ' poison']
      },
      {
         name: 'Squirtle', 
         height: 1.8, 
         types: ['water']
      },
      {
         name: 'Charmander', 
         height: 2, 
         types: ['fire']
      }
   ]

   function getAll () {
      return pokemonList;
   }
   
   function add (pokemon) {
      pokemonList.push(pokemon);
   }

   function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
         showDetails(pokemon);
      })
   }

   function showDetails(pokemon) {
         console.log(pokemon);
   }

   return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails
   };

})()

pokemonRepository.getAll().forEach(function (pokemon) {
   pokemonRepository.addListItem(pokemon);
});


