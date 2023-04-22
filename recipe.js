

var button = document.getElementById("search-button")
var search = document.getElementById("search-input")



button.addEventListener("click", function(event) {
    event.preventDefault();
    var searchValue = search.value;

    getRecipeData(searchValue).then(function(data){
      displayRecipeData(data);
    })
    

  });


async function getRecipeData(searchValue) {
    var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=96578cf4&app_key=ef31306002be0ec63784488c0c25e2ce&q=${searchValue}`)
    const data = await response.json();
    console.log(data);
    return data;
    
}



function displayRecipeData(data){
  
    var ingredients1 = $('.ingredients');
    var recipeTitle = $('.recipe-title');
    var recipeImage = $('.recipe-image');
  

    
    recipeTitle.html(data.hits[0].recipe.label);
    
    ingredients1.html(data.hits[0].recipe.ingredientLines.join(", ")); //Maybe turn the ingredients into a list using innerhtml right now it is a block of text?
  
    recipeImage.attr('src', data.hits[0].recipe.image);
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
