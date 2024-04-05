const searchForm = document.querySelector(`form`);
const searchResultDiv = document.querySelector(`.Search-result`);
const container = document.querySelector(`.container`);
let searchQuery = ``;
const App_id = `dcc44849`;
const App_key = `4f9cfcaaf70de9dd50971eb72e28910d`;

searchForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
searchQuery = e.target.querySelector(`input`).value;
    fetchAPI();
   
});

async function fetchAPI(){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${App_id}&app_key=${App_key}&to=25`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    if (data.hits.length === 0) {
        // If no results found, display "Not found"
        searchResultDiv.innerHTML = "<p>The Recipe you're looking for is not available</p>";
    } else {
        generateHTML(data.hits);
    }
    
}

  function generateHTML(results){
    let generatedHTML = '';
    container.classList.remove('initial');
    results.map( result => {
        generatedHTML += 
        `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories : ${result.recipe.calories.toFixed(2)}</p>
       

    </div>`
    })
    searchResultDiv.innerHTML = generatedHTML;

    }

