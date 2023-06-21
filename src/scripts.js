    let pokemonRepository = (function () {
      let pokemonList = []
  
      let apiLimit = 150;
      // sets limit on objects pulled from api
      let apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${apiLimit}`
      // calls set api limit from above
  
      // return object with getAll and add functions assigned as keys
      function add(pokemon) {
          if (
              typeof pokemon === 'object' &&
              pokemon.hasOwnProperty('name') &&
              pokemon.hasOwnProperty('detailsUrl')
          ) {
              pokemonList.push(pokemon)
          } else {
              alert('Error! Invalid entry')
          }
      }
  
      function getAll() {
          return pokemonList
      }
  
      function addListItem(pokemon) {
          // create li in .pokemon-list
          let pokemonUnorderedList = document.querySelector('.pokemon-list')
          let listItem = document.createElement('li')
          listItem.classList.add('list-group-item')
          listItem.classList.add('col')
  
          // create button for modal
          let button = document.createElement('button')
          button.innerHTML =
              pokemon.name.charAt(0).toUpperCase() +
              pokemon.name.slice(1) +
              '<br>'
          $(button).addClass('btn btn-primary')
          $(button).attr('data-toggle', 'modal')
          $(button).attr('data-target', '#exampleModal')
  
          // create image for button
          let buttonImage = document.createElement('img')
          $(buttonImage).attr('display', 'inline-block')
          buttonImage.src = pokemon.imageUrl
  
          // append created elements to parents
          button.appendChild(buttonImage)
          listItem.appendChild(button)
          pokemonUnorderedList.appendChild(listItem)
  
          // showDetails called after click
          button.addEventListener('click', function () {
              showDetails(pokemon)
          })
      }
  
      function loadList() {
          return fetch(apiUrl)
              .then(function (response) {
                  return response.json()
              })
              .then(function (json) {
                  let displayData = json.results.map((item) => {
                      let pokemon = {
                          name: item.name,
                          detailsUrl: item.url,
                      }
                      add(pokemon)
                      return loadDetails(pokemon)
                  })
                  return Promise.all(displayData)
              })
              .catch(function (e) {
                  console.error(e)
              })
      }
  
      // function that GETs pokemon details
      function loadDetails(pokemon) {
          let url = pokemon.detailsUrl
          return fetch(url)
              .then(function (response) {
                  return response.json()
              })
              .then(function (details) {
                  // add the details to the item
                  pokemon.imageUrl = details.sprites.front_default
                  pokemon.height = details.height

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
                  console.error(e)
              });
      }
  
      //function that logs pokemon to console
      function showDetails(pokemon) {
          loadDetails(pokemon).then(function () {
              function showModal(pokemon) {
                  // define the modal divs as variables
                  let modalTitle = $('.modal-title')
                  let modalBody = $('.modal-body')
  
                  // empty all of the divs each time the modal is opened
                  modalTitle.empty()
                  modalBody.empty()
  
                  //create the name element for the pokemon
                  let nameElement = $(
                      '<h1>' +
                          pokemon.name.charAt(0).toUpperCase() +
                          pokemon.name.slice(1) +
                          '</h1>'
                  )
  
                  // create height element and assign source
                  let heightElement = $(
                      '<p>' + 'Height : ' + pokemon.height + '</p>'
                  )
  
                  // create image element and assign source
                  let imageElement = document.createElement('img')
                  imageElement.src = pokemon.imageUrl

                  // create types element and assign source
                  let typesElement = $('<p>' + `Types : ${pokemon.types}</p>`)
    
                  // create abilities element and assign source
                  let abilitiesElement = $(
                    '<p>' + `abilities : ${pokemon.abilities}</p>`
                  )
  
                  //append elements to divs
                  modalTitle.append(nameElement)
                  modalBody.append(heightElement)
                  modalBody.append(imageElement)
                  modalBody.append(typesElement)
                  modalBody.append(abilitiesElement)
              }
  
              showModal(pokemon)
          })
      }
  
      // assign search bar and pokemon list area to vars to use in functions (DRY)
      let searchBar = document.querySelector('.search')
      let listArea = document.querySelector('.pokemon-list')
  
      // create pokemonFilter function with searchInput (searchbar.value) as parameter
      function pokemonFilter(searchInput) {
          // use filter method on Pokemon list filters names based on searchInput, toLowerCase to make NOT case sensitive
          return pokemonList.filter((pokemon) => {
              let filteredPokemon = pokemon.name
              return filteredPokemon.includes(searchInput.toLowerCase())
          })
      }
  
      // define function that clears all pokemon
      function removeList() {
          listArea.innerHTML = ''
      }
  
      // define function that adds pokemon back to the filtered list
      function addPokemon(pokemon) {
          pokemonRepository.addListItem(pokemon)
      }
  
      // add event listener to searchBar that listens for input
      searchBar.addEventListener('input', function () {
          // define what user enters, defines filteredList (pokemon.names that include searchInput)
          let searchInput = searchBar.value
          let filteredList = pokemonRepository.pokemonFilter(searchInput)
          // clear list of all items
          removeList()
          // fill list area with error message if no results
          if (filteredList.length === 0) {
              listArea.innerHTML = '<p>No pokemon match your search</p>'
              // else populate list with matching pokemon
          } else {
              filteredList.forEach(addPokemon)
          }
      })
  
      return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          pokemonFilter: pokemonFilter,
      }
  })()
  
  pokemonRepository.loadList().then(function () {
      // forEach loop that accesses pokemonList via getAll function
      pokemonRepository.getAll().forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon)
      })
  })