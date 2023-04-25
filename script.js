
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

  // nutritional analysis

  var button1 = document.getElementById("search-button");
var search1 = document.getElementById("search-input");

button1.addEventListener("click", function(event) {
  event.preventDefault();
  var searchValue = search1.value;
  window.location.href = "recipes.html?q=" + searchValue;
});


var button = document.getElementById("analyse-btn");
var search = document.getElementById("exampleFormControlTextarea1");


button.addEventListener("click",function(event){
    
    event.preventDefault();
    // window.location.href = "recipes.html";
   
    var searchValue = search.value;

    getNutritionalData(searchValue)
    


});
function getNutritionalData(input){

  $("#tbodyid").remove();
  $("#theadid").remove();
    var inputArr=input.split(',')
    var table = $('<table>').addClass('center');
    var thead = $('<thead>').attr('id','theadid');
    var tbody = $('<tbody>').attr('id','tbodyid');
    var header = $('<tr>');
    var cell1 = $('<th>').text('Quantity');
    var cell2 = $('<th>').text('Unit');
    var cell3 = $('<th>').text('Food');
    var cell4 = $('<th>').text('Calories(Kcal)');
    var cell5 = $('<th>').text('Weight(g)');
    header.append(cell1).append(cell2).append(cell3).append(cell4).append(cell5);
    thead.append(header);
    table.append(thead);
    for (var j = 0; j < inputArr.length; j++) { 
     
      var q=encodeURI(inputArr[j]);
      //var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=2b0b36a4&app_key=84650e5de19523e1f4e7cbdcdd44b20b&nutrition-type=cooking&ingr="+q;
      getNutritionData(q).then(function (data) {      
      var row = $('<tr>');
      var cell1 = $('<td>').text(data.ingredients[0].parsed[0].quantity);
      var cell2 = $('<td>').text(data.ingredients[0].parsed[0].measure);
      var cell3 = $('<td>').text(data.ingredients[0].parsed[0].food);
      var cell4 = $('<td>').text(data.calories);
      var cell5 = $('<td>').text(data.ingredients[0].parsed[0].weight); 
      row.append(cell1).append(cell2).append(cell3).append(cell4).append(cell5);
      tbody.append(row);  
      });
    }
      table.append(tbody);
      $("#textarea").append(table);
};
async function getNutritionData(searchValue) {
  var response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=2112a5a9&app_key=23e2e4ce3ed3f6ede140a4099e207922&nutrition-type=cooking&ingr=${searchValue}`);
  var data = await response.json();
  console.log(data);
}