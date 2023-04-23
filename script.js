

// var button = document.getElementById("search-button")
// var search = $("#search-input")


button.addEventListener("click",function(event){
    event.preventDefault();
    window.location.href = "recipes.html";
    document.style.display = 'none';
    var currentVal = search.val();

    getRecipeData(currentVal).then(function(data){
        
    });


});


// async function getRecipeData(searchValue) {
//     // document.getElementById('#recipe-search"').style.display = 'block';
//     var response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public/?q=${searchValue}&app_id=96578cf4&app_key=ef31306002be0ec63784488c0c25e2ce&imageSize=REGULAR&imageSize=SMALL`);
//     const data = await response.json();
//     console.log(data);
//     return data;
// }


 
var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
