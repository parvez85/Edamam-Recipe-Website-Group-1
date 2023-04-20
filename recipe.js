

var button = document.getElementById("search-button")
var search = document.getElementById("search-input")



button.addEventListener("click", function(event) {
    event.preventDefault();
    var searchValue = search.value;
    getRecipeData(searchValue);
  });


async function getRecipeData(searchValue) {
   // document.getElementsByClassName('card').style.display = 'block';
    var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=96578cf4&app_key=ef31306002be0ec63784488c0c25e2ce&q=${searchValue}`)
    console.log(response)
   const data = await response.json();
    console.log(data);
    return data;
}



function displayRecipeData (data){
    
    var image = $('#image');

    image.html(from.values(data).hits[0].recipe.images)
}