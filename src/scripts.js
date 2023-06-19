const pokemonRepository = (function () {
    const pokemonList = [];
    const apiLimit = 150; //Controls how many pokemon are loaded


    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${apiLimit}`; //Calls api limit from above
    const pokemonListElement = $('.pokemon-list');

    function filterPokemon(query) {

      return pokemonList.filter((pokemon) => {

        const pokemonLowerCase = pokemon.name.toLowerCase();
        const queryLowerCase = query.toLowerCase();

      return pokemonLowerCase.startsWith(queryLowerCase);
      });
    }

  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {

      if (typeof pokemon === 'object' && 'name' in pokemon) {

        pokemonList.push(pokemon);

        } else {

          console.log('pokemon is not correct');

        }
      }
  
    
      function addListItem(pokemon) {
        
        const pokedex = document.querySelector('.pokemon-list');

        const listitem = document.createElement('li');

        listitem.classList.add('col');

        const button = document.createElement('button');

        button.innerText = 
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        button.classList.add('button-class');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#examplemodal');

        const pokemonImage = document.createElement('img');
        
        pokemonImage.src = pokemon.imageUrlFront;
        button.appendChild(pokemonImage);

        listitem.appendChild(button);

        pokedex.appendChild(listitem);

        //add an event listener to created buttons to call showDetails func
        
        button.addEventListener('click', () => {
          showDetails(pokemon);
        });
      }
      

    //adding Load list function for task
    function loadList() {

      return fetch(apiUrl)

        .then((response) => response.json())

        .then((json) => {
          const promises = json.results.map((item) => {
            const pokemon = {

              name: item.name,
              detailsUrl: item.url,

            };

            add(pokemon);
            //call loadDetails for each pokemon

            return loadDetails(pokemon);
          });

          return Promise.all(promises);

        })

        .catch((e) => {
          console.error(e);
        });
    }
  
    //adding load details function with pokemon details
    function loadDetails(pokemon) {

      const url = pokemon.detailsUrl;

      return fetch(url)

        .then((response) => response.json())

        .then((details) => {
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.imageUrlFront = details.sprites.front_default;
          pokemon.imageUrlBack = details.sprites.back_default;

          const arrayOfTypes = [];

          details.types.forEach((pokemon) => {
            arrayOfTypes.push(pokemon.type.name);
          });

          pokemon.types = arrayOfTypes.join(', ');

          const arrayOfAbilities = [];
          details.abilities.forEach((ability) => {
            arrayOfAbilities.push(ability.ability.name);
          });

          pokemon.abilities = arrayOfAbilities.join(', ');
        })

        .catch(function (e) {
          console.error(e);
        });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
      const modalBody = $('.modal-body');
      const modalTitle = $('.modal-title');
  
      modalBody.empty();
      modalTitle.empty();

      const nameElement = $(
        `<h1>${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h1>`
      );
      const imageElementFront = $('<img class="modal-img" style="width: 50%">');
      imageElementFront.attr('src', pokemon.imageUrlFront);

      const imageElementBack = $('<img class="modal-img" style="width: 50%">');
      imageElementBack.attr('src', pokem.imageUrlBack);

      const heightElement = $('<p>' + `Height: + pokemon.height + </p>`);

      const weightElement = $('<p>' + `Weight : ${pokemon.weight}</p>`);

      const typesElement = $('<p>' + `Types: : ${pokemon.types}</p>`);

      const abilitiesElement = $('<p>' + `abilities : ${pokemon.abilities}</p>`);
  
      // appends the above elements to the modal body
      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack)
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
      });
    }
  
    return {
      getAll,
      add,
      addListItem,
      loadList,
      loadDetails,
      showDetails,
      filterPokemon,
    };
  })();

  const inputField = document.querySelector('input[type="search"]');

  function removeList() {
    const pokedex = document.querySelector('.pokemon-list');
    pokedex.innerHTML = '';
  }

  function showErrorMessage(message) {
    const pokedex = document.querySelector('.pokemon-list');
    pokedex.innerHTML = `<li>${message}</li>`;
  }

  function addListPokemon(pokemon) {
    pokemonRepository.addListItem(pokemon);
  }

  inputField.addEventListener('input', () => {
    const query = inputField.value;
    const fileredList = pokemonRepository.filterPokemon(query);
    removeList();

    if (fileredList.length === 0) {
      showErrorMessage(
        'Sorry! There are no Pokemon matching your search.'
      );
    } else {
      fileredList.forEach(addListPokemon);
    }
  });
  
  pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach(addListPokemon);
    });