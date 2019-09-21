import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }

    async  getResults(){
        const proxy = 'https://crossorigin.me/';
        const key = "374ee35083b9d6960df0e9a1e7af04db";

        try{
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }catch(error){
            alert(error);
    }

}
}
