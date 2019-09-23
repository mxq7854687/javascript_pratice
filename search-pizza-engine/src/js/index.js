// Global app controller


//https://www.food2fork.com/api/search
//374ee35083b9d6960df0e9a1e7af04db

import Search from './model/Search';
import Recipe from './model/Recipe';
import * as searchView from './view/searchView';
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
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

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
const r = new Recipe(46956);
r.getRecipe();
console.log(r);