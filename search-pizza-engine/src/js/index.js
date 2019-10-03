// Global app controller


//https://www.food2fork.com/api/search
//374ee35083b9d6960df0e9a1e7af04db

import Search from './model/Search';
import Recipe from './model/Recipe';
import List  from './model/List';
import Likes from './model/Like';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/ListView';
import * as likeView from './view/likeView'
import { elements, renderLoader, clearLoader } from './view/base';

/* global state of the app
 * - Search object
 * - Current recipe object
 * - Shoppint list object
 * - Liked recipes
 */
const state = {};
window.state=state;
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
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


/**
 * List Controller
 */
const controlList = () => {
    // Create a new list if there in non yet
    if(!state.list)state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        state.list.addItem(item);
        listView.renderItem(item);
    });
    
}

//Handle delete and update list item events
elements.shopping.addEventListener('click', e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id)
    //  Handle the delete button
    if (e.target.matches('.shopping__delete','.shopping__delete *')){
        // Delette from statre
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle update count
    }else if(e.target.matches('.shoppint__count-value')){
        const val = parseFloat(e.target.value)
        state.list.updateCount(id,val);
    }
});

/**
 * List Controller
 */
//  testing move likes to global scope
// state.likes=new Likes();

const controlLike = () => {
    if(!state.likes) state.likes=new Likes();
    const currentID = state.recipe.id;

    // user ha not yet liked current recipe
    if(!state.likes.isLiked(currentID)){
        // Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )
        // Toggle the like button
            likeView.toogleLikeBtn(true);
        // Add like to UI list
        console.log(state.likes);
    // user has liked current recipe
    }else{
        // Remove like to state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likeView.toogleLikeBtn(false);
        // Remove like button
        console.log(state.likes);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
}
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
    }else if (e.target.matches('.recipe__btn--add','.recipe__btn--add *')){
        // Add ingredients to shopping list
        controlList();
    }else if(e.target.matches('.recipe__love', '.recipe__love *')){
        // Like controller
        controlLike();
    }
});

window.l = new List();