// Global app controller


//https://www.food2fork.com/api/search
//374ee35083b9d6960df0e9a1e7af04db

import Search from './model/Search';
import Recipe from './model/Recipe';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import { elements, renderLoader, clearLoader } from './view/base';

/* global state of the app
 * - Search object
 * - Current recipe object
 * - Shoppint list object
 * - Liked recipes
 */
const state = {};

/**
 * Search Controller
 */
const controlSearch = async ()=> {
    // 1) Get query from the view
    const query = searchView.getInput(); //TODO

    if(query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // 4) Search fro recipes
        try{
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }catch(error){
            alert('Something get wrong.');
        }

    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

//testing
// windows.addEventListener('load', e=>{
//     e.preventDefault();
//     controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        
    }
});


/**
 * Recipe Controller
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#','');
    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Hightlight selected search view
        if (state.search) searchView.highlightSelected(id);
        // Create new recipe object
        state.recipe = new Recipe(id);
        try{
            // Get recipe data and parse ingradients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            //Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(error){
            console.log(error);
            alert('Something went wrong1.')
        }
        

    }
};

//  window.addEventListener('hashchange',controlRecipe);
//  window.addEventListener('load',controlRecipe);
//  short form
['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e=> {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    }else if (e.target.matches('.btn-increase, .btn-increase *')){
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});