

var button = $("#analyse-btn")
var search = $("#search-input")


button.addEventListener("click",function(event){
    event.preventDefault();
    // window.location.href = "recipes.html";
    document.style.display = 'none';
    var searchValue = search.value;

    getNutritionalData(searchValue)
    


});


async function getNutritionalData(searchValue) {
    // document.getElementById('#recipe-search"').style.display = 'block';
    var response = await fetch(`https://api.edamam.com/api/nutrition-data?q=${searchValue}app_id=0cee47da&app_key=989616bf3416033650b62679cb89f082&nutrition`);
    const data = await response.json();
    console.log(data);
    return data;
}


