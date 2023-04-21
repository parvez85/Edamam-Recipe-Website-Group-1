

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
  

    
    recipeTitle.html(data.hits[0].recipe.label);
    
    ingredients1.html(data.hits[0].recipe.ingredientLines.join(", ")); //Maybe turn the ingredients into a list using innerhtml right now it is a block of text?
  
}
