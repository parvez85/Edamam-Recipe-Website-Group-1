
$(document).ready(function() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var searchValue = urlParams.get('value');


    getFooterRecipeData(searchValue).then(function(data) {
        displayFooterRecipeData(data);
    });
    
})


async function getFooterRecipeData(searchValue) {
    var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=96578cf4&app_key=ef31306002be0ec63784488c0c25e2ce&q=${searchValue}`);
    var data = await response.json();
    console.log(data);
    return data;
  }

  function displayFooterRecipeData(data) {
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
      card.find('.cuisine').html(recipe.cuisineType.join(" / "));
      card.find('#recipe-button').attr('data-url', recipe.url).on('click', function() {
        var url = $(this).data('url');
        window.open(url, '_blank');
      });
  
      row.append($('<div class="col"></div>').append(card));
      card.removeClass('d-none');
  
      if ((i + 1) % 5 === 0) {
        row = $('<div class="row"></div>');
        recipeCards.append(row);
      }
    }
  }

