import axios from 'axios';
import { key , proxy} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }
    
    async getRecipe(){
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.scoure_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert('Something went wrong2');
        }
    }

    calcTime(){
        //Assuming that we need 15 min for each 3 ingredient
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }
    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitLong = ["tablesponns","tablespoon","ounces","ounce","teaspoons","teaspoon","cups","pounds"];
        const unitShort = ["tbsp","tbsp","oz","oz","tsp","tsp","cup","pound"];
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();  //use let because we may mutate the variable
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit,unitShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // 3) Parse ingredients into count , unit and ingredient
            const arrIng = ingredient.split(' ');
            //findIndex pass a callback function which return index which the el2 exist or -1 if not exist
            const unitIndex = arrIng.findIndex(el2 => unitShort.includes(el2));

            let objIng;
            if(unitIndex > -1){
                //There is a unit
            }else if(parseInt(arrIng[0],10)){
                //There is no unit but the 1st element is a number
                objIng ={
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(" ")
                }
            }else if (unitIndex == -1){
                //There is NO unit and No number in 1st position
                objIng ={
                    count: 1,
                    unit: '',
                    ingredient          // ingredient : ingredient
                }
            }
            return ingredient;
        });
        this.ingredients = newIngredients;
    }
}