var button = document.getElementById("search-button");
var search = document.getElementById("search-input");

button.addEventListener("click", function(event) {
  event.preventDefault();
  var searchValue = search.value;
  window.location.href = "recipes.html?q=" + searchValue;
});

$(document).ready(function() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var searchValue = urlParams.get('q');
  
  getRecipeData(searchValue).then(function(data) {
    displayRecipeData(data);
  });
});

async function getRecipeData(searchValue) {
  var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=dc308d27&app_key=4b945e27454211b058c8f59d82bef0cd&q=${searchValue}`);
  var data = await response.json();
  console.log(data);
  return data;
}

function displayRecipeData(data) {
  var recipeCards = $('#recipe-cards');
  var cardTemplate = $('#card-template');

  recipeCards.empty(); // Remove any existing cards

  var row = $('<div class="row"></div>');
  recipeCards.append(row);

  for (var i = 0; i < data.hits.length; i++) {
    var card = cardTemplate.clone().removeAttr('id').removeAttr('style');
    var recipe = data.hits[i].recipe;

    card.find('.recipe-title').html(recipe.label);
    card.find('.recipe-image').attr('src', recipe.image);
    card.find('#recipe-button').attr('data-url', recipe.url).on('click', function() {
      var url = $(this).data('url');
      window.open(url, '_blank');
    });

    row.append($('<div class="col"></div>').append(card));
    card.removeClass('d-none');

    if ((i + 1) % 4 === 0) {
      row = $('<div class="row"></div>');
      recipeCards.append(row);
    }
  }
}
