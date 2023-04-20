

var button = document.getElementById("search-button")
var search = document.getElementById("search-input")




button.addEventListener("click",function(event){
    event.preventDefault();
    var currentVal = search.val();

    //getRecipeData("search")

    getRecipeData(currentVal).then(function(data){
        displayWeatherData(data);
    });

});


async function getRecipeData(searchValue) {
   // document.getElementsByClassName('card').style.display = 'block';
    var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=96578cf4&app_key=ef31306002be0ec63784488c0c25e2ce&q=${searchValue}`)
    console.log(response)
   const data = await response.json();
    console.log(data);
    return data;
}

