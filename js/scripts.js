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
];
/*
//loop for printing pokemonList
for (let i = 0;
   i <pokemonList.length; i++) {
      if (pokemonList[i].height >2) {
         document.write(pokemonList[i].name + " is " + pokemonList[i].height + " feet tall and it is a " + pokemonList[i].types + " type! Wow, that's big!<br>")

      }
      else {
         document.write(pokemonList[i].name + " is " + pokemonList[i].height + " feet tall and it is a " + pokemonList[i].types + " type!<br>")

      }
   }
*/

   pokemonList.forEach(function(pokemon) {
      document.write(pokemon.name + " is " + pokemon.height + " feet tall and it is a " + pokemon.types + " type!<br> ");
   });
