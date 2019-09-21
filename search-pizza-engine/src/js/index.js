// Global app controller


//https://www.food2fork.com/api/search
//374ee35083b9d6960df0e9a1e7af04db

import axios from 'axios';

async function getResults(query){
    const proxy = 'https://crossorigin.me/';
    const key = "374ee35083b9d6960df0e9a1e7af04db";

    try{
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes
        console.log(recipes);
    }catch(error){
        alert(error);
    }

}

getResults('pizza');