export const categorizeIngredients =  (ingredients)=>{
    console.log("ingredients",ingredients);
    const categorized = ingredients.reduce((acc,ingredient)=>{
        const {category} = ingredient;
        if(!acc[category.name]){
            acc[category.name] = [];
        }
        acc[category.name].push(ingredient);
        return acc;

    },{})
    console.log("categorized ingredients",categorized);
    console.log("keys.object:",Object.keys(categorized));
    return categorized;
}